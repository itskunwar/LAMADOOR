const express = require("express");
const { register, login, registerAdmin } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/registerAdmin", registerAdmin);
authRouter.post("/login", login);

module.exports = authRouter;
