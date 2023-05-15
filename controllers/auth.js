const throwCustomError = require("../utitls/customError");
const User = require("../models/User");
const genPass = require("../utitls/genPass");

const registerAdmin = async (req, res, next) => {
  try {
    req.body.password = await genPass(req.body.password);
    const user = await User.create({ ...req.body, isAdmin: true });
    const token = user.createJWT();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    req.body.password = await genPass(req.body.password);
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throwCustomError(404, "Username dosen't exists");
    }
    const pwResult = await user.passwordMatch(password);
    if (!pwResult) {
      throwCustomError(400, "Incorrect Password");
    }
    const token = user.createJWT();
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  registerAdmin,
};
