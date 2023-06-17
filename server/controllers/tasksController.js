const Task = require("../model/Task");

// Create

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ message: "Task title and description are required." });

  // Conflict
  const duplicate = await Task.findOne({ title }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Task already exists" });

  try {
    const newTask = new Task({
      title,
      description,
    });
    await newTask.save();

    const tasks = await Task.find();
    res.status(201).json(tasks);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Read

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.deleteOne({ _id: id });

    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
