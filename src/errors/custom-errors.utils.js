const { HTTP_STATUS, HTTP_TEXTS, ERROR_CLASSES } = require("../constants");

class AppError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(ERROR_CLASSES.NOTFOUND_ERR, HTTP_STATUS.NOT_FOUND, message);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(ERROR_CLASSES.BAD_REQ_ERR, HTTP_STATUS.BAD_REQUEST, message);
  }
}

class DatabaseError extends AppError {
  constructor(message = "DB error") {
    super(ERROR_CLASSES.DB_ERR, HTTP_STATUS.SERVER_ERROR, message);
  }
}

class ValidationError extends AppError {
  constructor(message = "User validation error") {
    super(ERROR_CLASSES.VALIDATION_ERR, HTTP_STATUS.UNPROCESSABLE_REQ, message);
  }
}

class InternalServerError extends AppError {
  constructor(message = HTTP_TEXTS.INTERNAL_ERROR) {
    super(ERROR_CLASSES.INTERNAL_ERR, HTTP_STATUS.SERVER_ERROR, message);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = HTTP_TEXTS.UNAUTHORIZED) {
    super(ERROR_CLASSES.UNAUT_ERR, HTTP_STATUS.UNAUTHORIZED, message);
  }
}

// Add more custom error classes as needed

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  DatabaseError,
  ValidationError,
  InternalServerError,
  UnauthorizedError,
};
