const express = require("express");

const {
  signInController,
  getCurrent,
  signOutController,
  updateSubscription,
  uploadAvatar,
  registerController,
  renderMainPage,
  renderRegisterPage,
  renderLoginPage,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../shemas/user");

const userRouter = express.Router();

userRouter.get("/api/user/", renderMainPage);
userRouter.get("/api/user/register", renderRegisterPage);
userRouter.get("/api/user/login", renderLoginPage);

userRouter.post("/api/user/register", registerController);
userRouter.post("/api/user/signin", validateBody(schemas.logInSchema), signInController);
userRouter.get("/api/user/current", authenticate, getCurrent);
userRouter.post("/api/user/signout", authenticate, signOutController);
userRouter.patch("/api/user/", authenticate, updateSubscription);

userRouter.patch("/avatars", authenticate, upload.single("avatar"), uploadAvatar);

module.exports = userRouter;
