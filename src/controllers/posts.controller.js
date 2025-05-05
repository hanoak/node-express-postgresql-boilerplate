const postServices = require("../services/posts.services.js");
const { HTTP_STATUS } = require("../constants/index.js");

const getAllPosts = async (req, res) => {
  const posts = await postServices.getAllPosts();
  res.status(HTTP_STATUS.OK).json({ posts });
};

const getPostById = async (req, res) => {
  const post = await postServices.getPostById(req?.params?.postId);
  res.status(HTTP_STATUS.OK).json({ post });
};

const addPost = async (req, res) => {
  const post = await postServices.addPost(req?.params?.userId, req?.body);
  res.status(HTTP_STATUS.OK).json({ post });
};

const updatePost = async (req, res) => {
  const post = await postServices.updatePost(req?.params?.postId, req?.body);
  res.status(HTTP_STATUS.OK).json({ post });
};

const deletePost = async (req, res) => {
  const result = await postServices.deletePost(req?.params?.postId);
  res.status(HTTP_STATUS.OK).json({ result });
};

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
