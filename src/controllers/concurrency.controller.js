const usersServices = require("../services/concurrency.services");
const { HTTP_STATUS } = require("../constants/index.js");

const count = async (req, res) => {
  const user = await usersServices.count(req?.params?.userId);
  res.status(HTTP_STATUS.OK).json({ user });
};

const countFixed1 = async (req, res) => {
  const user = await usersServices.countFixed1(req?.params?.userId);
  res.status(HTTP_STATUS.OK).json({ user });
};

const countFixed2 = async (req, res) => {
  const user = await usersServices.countFixed2(req?.params?.userId);
  res.status(HTTP_STATUS.OK).json({ user });
};

const countFixed3 = async (req, res) => {
  const user = await usersServices.countFixed3(req?.params?.userId);
  res.status(HTTP_STATUS.OK).json({ user });
};

module.exports = {
  count,
  countFixed1,
  countFixed2,
  countFixed3,
};
