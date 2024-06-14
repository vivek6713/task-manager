const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");
const Task = require("../models/task.js");
const router = new express.Router();

// create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
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

// login route
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// logout user
router.post("/user/logout", auth, async (req, res) => {
  try {
    const token = req.token;
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// logout from all device
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// fetch user profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// fetch single user by id
// router.get("/user/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(400).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// update user
router.patch("/user/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// delete user
router.delete("/user/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    await Task.deleteMany({ owner: req.user._id });
    // await user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
