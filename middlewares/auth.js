const { validateToken } = require("../services/auth");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieName) {
      return next();
    }

    try {
      const payload = validateToken(cookieValue);
      req.user = payload;
    } catch (error) {}

    return next();
  };
}

module.exports = {
  checkAuthCookie,
};
