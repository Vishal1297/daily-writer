const router = require("express").Router();
const user = require("../controllers/user.controller");

/**
 * Get sign in page
 */

router.get("/signin", user.getSignInPage);

/**
 * User sign in
 */

router.post("/signin", user.signIn);

/**
 * Get signup page
 */

router.get("/signup", user.getSignUpPage);

/**
 * User sign up
 */

router.post("/signup", user.signUp);


module.exports = router;