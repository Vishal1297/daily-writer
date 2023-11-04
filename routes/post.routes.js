const router = require("express").Router();
const post = require("../controllers/post.controller");

/**
 * Create new post
 */

router.post("/post", post.create);

/**
 * Update post
 */

router.put("/post", post.update);

/**
 * Delete post
 */

router.delete("/post/:id", post.delete);

/**
 * Get all posts
 */

router.get("/posts", post.getAll);

module.exports = router;
