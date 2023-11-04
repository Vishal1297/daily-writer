const crypto = require("crypto");
const db = require("../models/mongoose");
const User = db.users;

exports.getSignInPage = (req, res) => {
  return res.render("signin");
};

exports.getSignUpPage = (req, res) => {
  return res.render("signup");
};

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = new User({
    uuid: crypto.randomUUID(),
    fullName: fullName,
    email: email,
    password: password,
  });

  await user
    .save(user)
    .then((data) => {})
    .catch((error) => {
      console.log("Error while user signup, msg", error.message);
    });

  return res.redirect("/");
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = User.matchPass(email, password)
  console.log('user', user);
  return res.redirect("/");
};
