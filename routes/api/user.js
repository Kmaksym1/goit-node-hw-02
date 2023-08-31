const express = require("express");
const { uploadAvatar } = require("../../controllers/auth");
const {
  signInController,
  getCurrent,
  signOutController,
  updateSubscription,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../shemas/user");

const userRouter = express.Router();

userRouter.post("/signin", validateBody(schemas.logInSchema), signInController);
userRouter.get("/current", authenticate, getCurrent);
userRouter.post("/signout", authenticate, signOutController);
userRouter.patch("/", authenticate, updateSubscription);

userRouter.patch("/avatars", authenticate, upload.single("avatar"), uploadAvatar);

module.exports = userRouter;
