const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const jwtAuth = require("../middlewares/jwtAuth");
const adminAuth = require("../middlewares/adminAuth");

const userRouter = express.Router();

userRouter.get("/", jwtAuth, adminAuth, getUsers);
userRouter.get("/:id", jwtAuth, adminAuth, getUser);
userRouter.put("/:id", jwtAuth, updateUser);
userRouter.delete("/:id", jwtAuth, adminAuth, deleteUser);

module.exports = userRouter;
