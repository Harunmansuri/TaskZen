import task from "../models/task.model.js";

export const addtask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description fields are required",
      });
    }
    if (title.length < 6) {
      return res.status(400).json({
        message: "Title must be at least 6 characters long",
      });
    }
    if (description.length < 10) {
      return res.status(400).json({
        message: "Description must be at least 10 characters long",
      });
    }

    const newTask = new task({
      title,
      description,
      priority,
      status,
    });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(201).json({
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const edittask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    const user = req.user;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description fields are required",
      });
    }
    if (title.length < 6) {
      return res.status(400).json({
        message: "Title must be at least 6 characters long",
      });
    }
    if (description.length < 10) {
      return res.status(400).json({
        message: "Description must be at least 10 characters long",
      });
    }
    await task.findByIdAndUpdate(
      id,
      { title, description, priority, status },
      { new: true }
    );
    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const gettask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeatils = await task.find({ id: id });
    return res.status(200).json({
      message: "Task fetched successfully",
      task: taskDeatils,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deletetask = async (req, res) => {
  try {
    const { id } = req.params;
    await task.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};