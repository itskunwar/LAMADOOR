const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: true,
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "Email is required as hell"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { username: this.username, id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

UserSchema.methods.passwordMatch = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("User", UserSchema);
