const User = require("../models/users.model");

const getAllUsers = async () => {
  return await User.find()
    .select("-password")
    .populate("startups", "name industry foundedYear");
};

const getSingleUser = async (id) => {
  return await User.findById(id)
    .select("-password")
    .populate("startups", "name industry foundedYear");
};

const createUser = async (data) => {
  return await User.create(data);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
