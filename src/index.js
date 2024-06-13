const express = require("express");
const userRoutes = require("./routers/user.js");
const taskRoutes = require("./routers/task.js");
require("./db/mongoose.js");

const app = express();
const port = 3000;

// parse json to object automatically
app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
