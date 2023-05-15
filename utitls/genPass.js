const bcrypt = require("bcryptjs");

const genPass = async (simp) => {
  const salt = await bcrypt.genSalt(10);
  const comp = await bcrypt.hash(simp, salt);
  return comp;
};

module.exports = genPass;
