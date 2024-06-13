const mongoose = require("mongoose");
const validator = require("validator");
// connect database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});

// define model
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true, // add validation
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true, // add validation
//     trim: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Invalid email address");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     validate(value) {
//       if (value.length < 6) {
//         throw new Error("Password must be greater than 6 char.");
//       }
//       if (value.includes("password")) {
//         throw new Error("Password must not contain password");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be positive number.");
//       }
//     },
//   },
// });

////////// create instance of model
// const me = new User({
//   name: "Mike",
//   password: "hello123",
//   email: "test@example.com",
//   age: 24,
// });

// ////// save to database
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => console.log(error));

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const myTask = new Task({
//   description: "my task list is long",
// });

// myTask
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise chaining
// Task.findByIdAndDelete("666a80306d2e02046e07a2dd")
//   .then((task) => {
//     console.log(task);
//     return Task.find({ completed: false }).count();
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
