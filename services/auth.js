const JWT = require("jsonwebtoken");

const secret = "#@12XYZ%&";

function generateUserToken(user) {
  const payload = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };

  const token = JWT.sign(payload, secret);

  return token;
}

function validateToken(token) {
  return JWT.verify(token, secret);
}

module.exports = {
  generateUserToken,
  validateToken,
};
