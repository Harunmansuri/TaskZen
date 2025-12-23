import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  addtask,
  deletetask,
  edittask,
  gettask,
} from "../controllers/task.controller";

const router = express.Router();
router.post("/addTask", auth, addtask);
router.get("/getTask/:id", auth, gettask);
router.put("/editTask/:id", auth, edittask);
router.delete("/deleteTask/:id", auth, deletetask);


export default router;
