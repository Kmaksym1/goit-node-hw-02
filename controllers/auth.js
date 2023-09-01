const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");

const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../shemas/user");
const { updateUsersSubscription, getUserByEmail } = require("../services/user");
const Jimp = require("jimp");
require("dotenv").config();
const { SECRET } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const renderMainPage = (req, res) => {
  res.render("index");
};
const renderRegisterPage = (req, res) => {
  res.render("register");
};
const renderLoginPage = (req, res) => {
  res.render("login");
};

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
  });
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password invalide");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const signOutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "SignOut Success",
  });
};
const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(404, "Invalid subscription value");
  }
  const result = await updateUsersSubscription(_id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};
const uploadAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  try {
    const image = await Jimp.read(tempUpload);
    const newHeight = Jimp.AUTO;
    await image.resize(250, newHeight).write(tempUpload);
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Image processing failed." });
  }
};

module.exports = {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  registerController: ctrlWrapper(registerController),
  signInController: ctrlWrapper(signInController),
  signOutController: ctrlWrapper(signOutController),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  uploadAvatar: ctrlWrapper(uploadAvatar),
};
