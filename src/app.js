const express = require("express");
const userRoutes = require("./routers/user.js");
const taskRoutes = require("./routers/task.js");
require("./db/mongoose.js");

const app = express();

// parse json to object automatically
app.use(express.json());

// create middleware
// app.use((req, res, next) => {
//   res.status(503).send("Site is under maintance mode!");
// });

app.use(userRoutes);
app.use(taskRoutes);

// global error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  console.log(err.stack);
  res.status(500).send({
    status: "fail",
    error: err.message ?? "Internal Server Error",
    stack: err.stack,
  });
});

app.get("*", (req, res) => {
  res.status(404).send({
    status: "fail",
    error: "route not found",
  });
});
module.exports = app;
