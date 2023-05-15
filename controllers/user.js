const User = require("../models/User");
const bcrypt = require("bcryptjs");
const genPass = require("../utitls/genPass");
const throwCustomError = require("../utitls/customError");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      req.body.password = await genPass(req.body.password);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { ...this, ...req.body },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.isAdmin) {
      throwCustomError(401, "Admin user can't be deleted");
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
