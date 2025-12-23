import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  addTask,
  getTask,
  editTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Protected Task Routes
router.post("/add-task", auth, addTask);
router.get("/get-task/:id", auth, getTask);
router.put("/edit-task/:id", auth, editTask);
router.delete("/delete-task/:id", auth, deleteTask);

export default router;
