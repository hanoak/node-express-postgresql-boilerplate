const { Router } = require("express");
const PostsController = require("../controllers/posts.controller.js");

const router = Router({ mergeParams: true });

// GET /api/v1/posts
// Get all posts
router.get("/", PostsController.getAllPosts);

// GET /api/v1/posts/:id
// Get post by ID
router.get("/:postId", PostsController.getPostById);

// POST /api/v1/posts
// Create a new post
router.post("/user/:userId", PostsController.addPost);

// PUT /api/v1/posts/:id
// Update user by ID
router.put("/:postId", PostsController.updatePost);

// DELETE /api/v1/posts/:id
// Delete user by ID
router.delete("/:postId", PostsController.deletePost);

module.exports = router;
