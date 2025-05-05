const usersValidator = require("./users.validators.js");
const postsBodyValidator = require("./posts.validators.js");

module.exports =
  (route = "") =>
  async (req, res, next) => {
    const appValidators = {
      users: usersValidator,
      posts: postsBodyValidator,
    };

    const validations = appValidators[route];

    for (const validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty())
        return res.status(400).json({ errors: result.array() });
    }

    return next();
  };
