const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

setAppRoutes(app);
setMiddleware(app);

function setMiddleware(app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "1mb", extended: true }));
  app.use(cookieParser());
  app.use(cors());

  /**
   * Routes
   */
  app.use("/user", require("./routes/user.routes"));
  app.use("/post", require("./routes/post.routes"));
}

function setAppRoutes(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
}

module.exports = app;
