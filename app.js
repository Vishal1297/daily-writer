const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkAuthCookie } = require("./middlewares/auth");
const { myLogger } = require("./middlewares/logger");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));

setMiddleware(app);
setAppRoutes(app);

function setMiddleware(app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "1mb", extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(checkAuthCookie("token"));
  app.use(myLogger())

  /**
   * Routes
   */
  app.use("/post", require("./routes/post.routes"));
  app.use("/user", require("./routes/user.routes"));
}

function setAppRoutes(app) {
  app.get("/", (req, res) => {
    res.render("home", {
      user: req.user,
    });
  });

  app.get("/about", (req, res) => {
    res.render("about", {
      user: req.user,
    });
  });
}

module.exports = app;
