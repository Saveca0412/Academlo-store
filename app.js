const express = require("express");

const { orderRouter } = require("./routes/order.routes");
const { userRouter } = require("./routes/user.routes");

const { globalErrorHandler } = require("./controllers/error.controller.js");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.use(globalErrorHandler);

app.all("*", (req, res) => {
  const { method, url } = req;

  res.status(404).json({
    status: "error",
    message: `${method} ${url} doesn't exist in our server`,
  });
});

module.exports = { app };
