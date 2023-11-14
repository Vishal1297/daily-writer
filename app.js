const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const db = require('./db');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkAuthCookie } = require("./middlewares/auth");
const Post = require("./models/mongoose").posts;
const normalizePort = require("normalize-port");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));

db.connect();
setMiddleware(app);
setAppRoutes(app);

const PORT = normalizePort(process.env.PORT || "3000");

http.createServer(app).listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});


function setMiddleware(app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "1mb", extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(checkAuthCookie("token"));
  app.use(express.static(path.resolve("./public")));

  /**
   * Routes
   */
  app.use("/post", require("./routes/post.routes"));
  app.use("/user", require("./routes/user.routes"));
}

function setAppRoutes(app) {
  app.get("/", async (req, res) => {
    const allPosts = await Post.find({}).sort({ createdAt: 1 });
    res.render("home", {
      user: req.user,
      posts: allPosts,
    });
  });

  app.get("/about", (req, res) => {
    res.render("about", {
      user: req.user,
    });
  });
}

module.exports = app;