const User = require("../models/User");
const throwCustomError = require("../utitls/customError");

const adminAuth = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user.isAdmin) {
      throwCustomError(401, "Authorization failed, admin access only");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = adminAuth;
