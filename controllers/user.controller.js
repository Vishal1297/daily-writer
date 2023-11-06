const crypto = require("crypto");
const User = require("../models/mongoose").users;

exports.getSignInPage = (req, res) => {
  return res.render("signin");
};

exports.getSignUpPage = (req, res) => {
  return res.render("signup");
};

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = new User({
    fullName: fullName,
    email: email,
    password: password,
  });

  user
    .save()
    .then((data) => {})
    .catch((error) => {
      console.log("Error while user signup, msg", error.message);
    });

  try {
    const token = await User.matchPassAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signup", {
      error: "Something went wrong, try again!",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPassAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect email or password!",
    });
  }
};

exports.logOut = async (req, res) => {
  res.clearCookie("token").redirect("/");
};
