const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true, // add validation
    trim: true,
  },
  email: {
    type: String,
    required: true, // add validation
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password must be greater than 6 char.");
      }
      if (value.includes("password")) {
        throw new Error("Password must not contain password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number.");
      }
    },
  },
});

module.exports = User;
