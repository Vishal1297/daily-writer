function myLogger() {
  return (req, res, next) => {
    if (req.body) {
      console.log("REQUEST BODY:", req.body);
    }
    return next();
  };
}

module.exports = {
  myLogger,
};
