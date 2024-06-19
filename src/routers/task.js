const express = require("express");
const Task = require("../models/task.js");
const router = new express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");

// create task
router.post("/task", auth, async (req, res, next) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    next(error);
  }
});

// fetch all tasks
// tasks?completed=true
// tasks?limit=10&skip:10
// tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res, next) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (error) {
    next(error);
  }
});

// fetch task by id
router.get("/task/:id", auth, async (req, res, next) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    next(error);
  }
});

// update task
router.patch("/task/:id", auth, async (req, res, next) => {
  try {
    // check if invalid field to update
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "invalid updates" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(task);
  } catch (error) {
    next(error);
  }
});

// delete task
router.delete("/task/:id", auth, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
