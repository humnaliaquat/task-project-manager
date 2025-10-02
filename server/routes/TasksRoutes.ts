import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

// GET all tasks
router.get("/", TaskController.GetAllTasks);

// GET a single task by ID
router.get("/:id", TaskController.GetOneTask);

// CREATE a new task
router.post("/", TaskController.CreateTask);

// UPDATE an existing task by ID
router.put("/:id", TaskController.UpdateTask);

// DELETE a task by ID
router.delete("/:id", TaskController.DeleteTask);
router.patch("/:id", TaskController.UpdateAllTasks);

export default router;
