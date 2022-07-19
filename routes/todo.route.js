const { Router } = require("express");
const router = Router();
const Todo = require("../models/Todo");

router.post("/add", async (req, res) => {
  try {
    const { text, userId } = req.body;

    const todo = await new Todo({
      owner: userId,
      text,
      isComplated: false,
    });

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const { userSortedParams } = req.query;

    const todo = await Todo.find({ owner: userId }).sort({
      created_at: userSortedParams,
    });

    console.log(todo);
    return todo.length === 0
      ? res.status(204).json({ message: "not data" })
      : res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id });
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.put("/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    todo.isComplated = !todo.isComplated;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
