const { body } = require("express-validator");

const postsBodyValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters long"),
  body("body")
    .exists()
    .withMessage("Post's body is required")
    .isString()
    .withMessage("Post's body must be a string")
    .isLength({ min: 3, max: 500 })
    .withMessage("Post's body must be between 3 and 500 characters long"),
];

module.exports = postsBodyValidator;
