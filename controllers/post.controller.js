const multer = require("multer");
const path = require("path");
const db = require("../models/mongoose");
const { title } = require("process");
const Post = db.posts;

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

(exports.create = upload.single("coverImage")),
  (req, res, next) => {
    console.log("before saving");
    const post = Post.create({
      title: title,
      body: body,
      createdBy: "req.user.uuid",
      coverImageURL: `/uploads/${req.file.fieldname}`,
    });
    console.log("after saving");
    return res.redirect(`/`);
  };

exports.newPost = (req, res) => {
  return res.render("new-post", {
    user: req.user,
  });
};

exports.update = (req, res) => {
  return res.render("");
};

exports.delete = (req, res) => {
  return res.render("");
};

exports.getAll = (req, res) => {
  return res.render("");
};
