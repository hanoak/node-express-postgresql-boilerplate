const usersServices = require("../services/users.services");
const { HTTP_STATUS } = require("../constants/index.js");

const getAllUsers = async (req, res) => {
  const users = await usersServices.getAllUsers();
  res.status(HTTP_STATUS.OK).json({ users });
};

const getUserById = async (req, res) => {
  const user = await usersServices.getUserById(req?.params?.id);
  res.status(HTTP_STATUS.OK).json({ user });
};

const addUser = async (req, res) => {
  const user = await usersServices.addUser(req?.body);
  res.status(HTTP_STATUS.OK).json({ user });
};

const updateUser = async (req, res) => {
  const user = await usersServices.updateUser(req?.params?.id, req?.body);
  res.status(HTTP_STATUS.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const result = await usersServices.deleteUser(req?.params?.id);
  res.status(HTTP_STATUS.OK).json({ result });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
