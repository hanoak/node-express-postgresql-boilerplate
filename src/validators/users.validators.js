const { body } = require("express-validator");

const usersBodyValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be between 5 and 100 characters long"),
  body("role")
    .exists()
    .withMessage("Role is required")
    .isString()
    .withMessage("Role must be a string")
    .isIn(["admin", "user"])
    .withMessage("Role must be either 'admin' or 'user'"),
];

module.exports = usersBodyValidator;
