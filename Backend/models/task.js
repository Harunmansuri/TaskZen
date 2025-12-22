import { Mongoose } from "mongoose";

const taskSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  status: {
    type: String,
    required: true,
    enum: ["Start", "In Progress", "Completed"],
    default: "Start",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
