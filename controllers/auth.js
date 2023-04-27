const User = require("../models/User");

const register = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "User failed to create" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Username not found");
    }
    const pwResult = await user.passwordMatch(password);
    if (!pwResult) {
      throw new Error("Incorrect password");
    }
    const token = user.createJWT();
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    const msg = err.message || "Login failed";
    res.status(500).json({ msg });
  }
};

module.exports = {
  register,
  login,
};
