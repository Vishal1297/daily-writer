const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const Post = require("../models/mongoose").posts;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage }).single("coverImage");

exports.create = function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log("upload cover image error:", error.message);
      return res.render("/new-post", {
        error: "Something went wrong, try again!",
      });
    }
    const { title, body } = req.body;
    try {
      Post({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
      }).save();
    } catch (error) {
      console.log("save post error", error.message);
    }
    return res.redirect(`/`);
  });
};

exports.newPost = (req, res) => {
  return res.render("new-post", {
    user: req.user,
  });
};

exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('createdBy');
    return res.render("post", {
      user: req.user,
      post,
    });
  } catch (error) {
    console.log("get blog error:", error.message);
  }
  return res.render("/", {
    error: "Something went wrong, try again!",
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
