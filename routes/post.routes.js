const postRouter = require("express").Router();
const post = require("../controllers/post.controller");

/**
 * Create new post
 */

postRouter.post("/", post.create);

/**
 * Get new post page
 */

postRouter.get("/", post.newPost);

/**
 * Get post by id
 */

postRouter.get("/:id", post.getById);

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
