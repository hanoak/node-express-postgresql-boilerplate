const { validate: uuidValidate } = require("uuid");
const { ValidationError } = require("../errors/custom-errors.utils.js");

module.exports = (uuids = {}) => {
  return (req, res, next) => {
    const { params } = req;

    if (Object.keys(uuids || {}).length === 0) return next();

    for (const [key, value] of Object.entries(uuids)) {
      if (typeof params[value] !== "string")
        throw new ValidationError(`Invalid UUID format for ${key}`);
      if (!uuidValidate(params[value]))
        throw new ValidationError(`Invalid UUID format for ${key}`);
    }

    return next();
  };
};
