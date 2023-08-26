const express = require("express");
const { signInController, getCurrent, signOutController, updateSubscription } = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../shemas/user");
// const { registerController } = require("../../controllers/auth");
// const {controller} = require ("../../controllers/user");
const userRouter = express.Router(); 

// const { validateBody } = require("../../middlewares")
// const {schemas} = require("../../shemas/users")

// validateBody(schemas.signUpSchema),
// userRouter.post("/register",  registerController)
// router.get('/')
userRouter.post("/signin", validateBody(schemas.logInSchema), signInController)
userRouter.get("/current", authenticate, getCurrent)
userRouter.post("/signout", authenticate, signOutController)
userRouter.patch("/",authenticate, updateSubscription ) 
module.exports = userRouter;



