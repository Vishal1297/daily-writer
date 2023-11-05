const postRouter = require("express").Router();
const post = require("../controllers/post.controller");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const Post = require("../models/mongoose").posts;

/**
 * Create new post
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

postRouter.post("/", upload.single("coverImage"), async (req, res) => {
  console.log("before saving");
  const { title, body } = req.body;
  const post = new Post.create({
    uuid: crypto.randomUUID(),
    title: title,
    body: body,
    createdBy: "req.user.uuid",
    coverImageURL: `/uploads/${req.file.fieldname}`,
  });

  post
    .save()
    .then((data) => {})
    .catch((error) => {
      console.log("Error while user signup, msg", error.message);
    });

  console.log("after saving");
  return res.redirect(`/`);
});

/**
 * Get new post page
 */

postRouter.get("/", post.newPost);

/**
 * Update post
 */

postRouter.put("/", post.update);

/**
 * Delete post
 */

postRouter.delete("/:id", post.delete);

/**
 * Get all posts
 */

postRouter.get("/all", post.getAll);

module.exports = postRouter;
