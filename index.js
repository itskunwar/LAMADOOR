const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const { errorHandler, notFound } = require("./middlewares");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

const app = express();

const PORT = process.env.PORT || 8000;
dotenv.config();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandler);
app.use(notFound);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("Server is listening on PORT:", PORT));
  } catch (err) {
    console.log("IndexJs Error::", err);
  }
};

startServer();
