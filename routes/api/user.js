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
  verifyEmail,
  resendVerifyEmail,
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

userRouter.get("/api/user/verify/:verificationToken", verifyEmail)
userRouter.post("/api/user/verify", validateBody(schemas.verifySchema), resendVerifyEmail);


  module.exports = userRouter;


//   router.get("/verify/:verificationToken", ctrl.verifyEmail);

// router.post("./verify", validateBody(schemas.verifySchema), ctrl.resendVerifyEmail);
