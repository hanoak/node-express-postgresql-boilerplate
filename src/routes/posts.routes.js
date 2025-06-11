const { Router } = require("express");
const PostsController = require("../controllers/posts.controller.js");
const uuidValidator = require("../middlewares/uuid-validator.middleware.js");
const validators = require("../validators");

const router = Router({ mergeParams: true });

// GET /api/v1/posts
// Get all posts
router.get("/", PostsController.getAllPosts);

// GET /api/v1/posts/:id
// Get post by ID
router.get(
  "/:postId",
  uuidValidator({ postId: "postId" }),
  PostsController.getPostById,
);

// POST /api/v1/posts
// Create a new post
router.post(
  "/user/:userId",
  uuidValidator({ userId: "userId" }),
  validators("posts"),
  PostsController.addPost,
);

// PUT /api/v1/posts/:id
// Update user by ID
router.put(
  "/:postId",
  uuidValidator({ postId: "postId" }),
  validators("posts"),
  PostsController.updatePost,
);

// DELETE /api/v1/posts/:id
// Delete user by ID
router.delete(
  "/:postId",
  uuidValidator({ postId: "postId" }),
  PostsController.deletePost,
);

module.exports = router;
