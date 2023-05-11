const jwt = require("jsonwebtoken");
const throwCustomError = require("../utitls/customError");

const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throwCustomError(401, "Authorization falied, token not found");
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.id, username: payload.username };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtAuth;
