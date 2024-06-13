const express = require("express");
const User = require("../models/user.js");

const router = new express.Router();

// create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }

  // handling with then
  // user
  //   .save()
  //   .then(() => {
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

// fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// fetch single user by id
router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// update user
router.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// delete user
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
