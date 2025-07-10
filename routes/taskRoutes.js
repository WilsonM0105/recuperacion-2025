import express from "express";
import {
  listTasks,
  createNewTask,
  updateTask,
  deleteTaskById,
  getTaskSummary,
  searchTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", listTasks);
router.post("/tasks", createNewTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTaskById);
router.get("/tasks/summary", getTaskSummary);
router.get("/tasks/search", searchTasks);

export default router;
