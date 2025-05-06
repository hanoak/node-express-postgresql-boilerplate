const {
  InternalServerError,
  BadRequestError,
  AppError,
} = require("../errors/custom-errors.utils.js");
const { sequelize, User } = require("../database/models");
const { Transaction } = require("sequelize");
const { HTTP_TEXTS } = require("../constants");
const logger = require("../logger");

const getAllUsers = async () => {
  try {
    const users = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const users = await User.findAll(
          { include: "posts", limit: 100 },
          { transaction: t },
        );
        return users || [];
      },
    );

    return users;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const getUserById = async (id) => {
  try {
    const users = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const user = await User.findOne(
          { where: { uuid: id }, include: "posts" },
          { transaction: t },
        );

        if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

        return user;
      },
    );
    return users;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

const addUser = async (body) => {
  try {
    const { name, email, role } = body;
    const user = await User.create({ name, email, role });
    return user;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const updateUser = async (id, body) => {
  try {
    const { name, email, role } = body;

    const user = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const user = await User.findOne(
          { where: { uuid: id } },
          { transaction: t },
        );

        if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

        user.set({
          name,
          email,
          role,
        });

        await user.save({ transaction: t });
        return user;
      },
    );

    return user;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

const deleteUser = async (id) => {
  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const user = await User.findOne(
          { where: { uuid: id } },
          { transaction: t },
        );
        if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

        await user.destroy({ transaction: t });
        return HTTP_TEXTS.USER_DELETED;
      },
    );

    return result;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
