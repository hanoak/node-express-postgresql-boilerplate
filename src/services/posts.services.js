const {
  InternalServerError,
  BadRequestError,
  AppError,
} = require("../errors/custom-errors.utils.js");
const { sequelize, Post, User } = require("../database/models");
const { Transaction } = require("sequelize");
const { HTTP_TEXTS } = require("../constants");
const logger = require("../logger");

const getAllPosts = async () => {
  try {
    const posts = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const posts = await Post.findAll({ limit: 100 }, { transaction: t });
        return posts || [];
      },
    );

    return posts;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError();
  }
};

const getPostById = async (postId) => {
  try {
    const post = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const post = await Post.findOne(
          { where: { uuid: postId } },
          { transaction: t },
        );

        if (!post) throw new BadRequestError(HTTP_TEXTS.POST_NOT_FOUND);

        return post;
      },
    );
    return post;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

const addPost = async (userId, body) => {
  try {
    const { title, body: postBody } = body;
    const user = await User.findOne({ where: { uuid: userId } });

    if (!user) throw new BadRequestError(HTTP_TEXTS.USER_NOT_FOUND);

    const post = await Post.create({ title, body: postBody, userId: user.id });
    return post;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

const updatePost = async (postId, body) => {
  try {
    const { title, body: postBody } = body;

    const post = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const post = await Post.findOne(
          { where: { uuid: postId } },
          { transaction: t },
        );

        if (!post) throw new BadRequestError(HTTP_TEXTS.POST_NOT_FOUND);

        post.set({
          title,
          body: postBody,
        });

        await post.save({ transaction: t });
        return post;
      },
    );

    return post;
  } catch (err) {
    logger.error(err);

    if (err instanceof AppError) throw err;

    throw new InternalServerError();
  }
};

const deletePost = async (postId) => {
  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (t) => {
        const post = await Post.findOne(
          { where: { uuid: postId } },
          { transaction: t },
        );
        if (!post) throw new BadRequestError(HTTP_TEXTS.POST_NOT_FOUND);

        await post.destroy({ transaction: t });
        return HTTP_TEXTS.POST_DELETED;
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
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
