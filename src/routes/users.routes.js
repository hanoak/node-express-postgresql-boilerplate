const { Router } = require("express");
const UsersController = require("../controllers/users.controller.js");

const router = Router({ mergeParams: true });

// GET /api/v1/users
// Get all users
router.get("/", UsersController.getAllUsers);

// GET /api/v1/users/:id
// Get user by ID
router.get("/:id", UsersController.getUserById);

// POST /api/v1/users
// Create a new user
router.post("/", UsersController.addUser);

// PUT /api/v1/users/:id
// Update user by ID
router.put("/:id", UsersController.updateUser);

// DELETE /api/v1/users/:id
// Delete user by ID
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
