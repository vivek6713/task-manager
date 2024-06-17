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

module.exports = app;
