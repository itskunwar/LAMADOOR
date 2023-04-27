const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(express.json());
app.use("/auth", authRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("Server is listening on PORT:", PORT));
  } catch (err) {
    console.log("IndexJs Error::", err);
  }
};

startServer();
