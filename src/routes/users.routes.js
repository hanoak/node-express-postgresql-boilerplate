const { Router } = require("express");
const UsersController = require("../controllers/users.controller.js");
const uuidValidator = require("../validators/uuid.validator.js");
const validators = require("../validators");

const router = Router({ mergeParams: true });

// GET /api/v1/users
// Get all users
router.get("/", UsersController.getAllUsers);

// GET /api/v1/users/:id
// Get user by ID
router.get(
  "/:id",
  uuidValidator({ userId: "id" }),
  UsersController.getUserById,
);

// POST /api/v1/users
// Create a new user
router.post("/", validators("users"), UsersController.addUser);

// PUT /api/v1/users/:id
// Update user by ID
router.put(
  "/:id",
  uuidValidator({ userId: "id" }),
  validators("users"),
  UsersController.updateUser,
);

// DELETE /api/v1/users/:id
// Delete user by ID
router.delete(
  "/:id",
  uuidValidator({ userId: "id" }),
  UsersController.deleteUser,
);

module.exports = router;
