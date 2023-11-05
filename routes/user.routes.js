const userRouter = require("express").Router();
const user = require("../controllers/user.controller");

/**
 * Get sign in page
 */

userRouter.get("/signin", user.getSignInPage);

/**
 * User sign in
 */

userRouter.post("/signin", user.signIn);

/**
 * Get signup page
 */

userRouter.get("/signup", user.getSignUpPage);

/**
 * User sign up
 */

userRouter.post("/signup", user.signUp);

/**
 * User logout
 */

userRouter.get("/logout", user.logOut);

module.exports = userRouter;
