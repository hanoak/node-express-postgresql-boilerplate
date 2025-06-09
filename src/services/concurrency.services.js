const {
  InternalServerError,
  BadRequestError,
  // AppError,
} = require("../errors/custom-errors.utils.js");
const { sequelize, User } = require("../database/models");
const { Transaction } = require("sequelize");
const { HTTP_TEXTS } = require("../constants");
const logger = require("../logger");

const count = async (id) => {
  try {
    const user = await User.findOne({ where: { uuid: id } });

    if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

    user.set({
      visits: user.visits + 1,
    });

    await user.save();

    return user;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const countFixed1 = async (id) => {
  try {
    const user = await User.increment({ visits: 1 }, { where: { uuid: id } });

    return user;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const countFixed2 = async (id) => {
  try {
    const user = await sequelize.transaction(async (t) => {
      const user = await User.findOne(
        { where: { uuid: id } },
        { transaction: t, lock: Transaction.LOCK.UPDATE },
      );

      if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

      user.set({
        visits: user.visits + 1,
      });

      await user.save({ transaction: t });
      return user;
    });
    return user;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const countFixed3 = async (id) => {
  try {
    const user = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const user = await User.findOne(
          { where: { uuid: id } },
          { transaction: t, lock: Transaction.LOCK.UPDATE },
        );

        if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

        user.set({
          visits: user.visits + 1,
        });

        await user.save({ transaction: t });
        return user;
      },
    );
    return user;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

module.exports = {
  count,
  countFixed1,
  countFixed2,
  countFixed3,
};
