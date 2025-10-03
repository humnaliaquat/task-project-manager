import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

// GET all tasks
router.get("/", TaskController.GetAllTasks);

// recent task 
router.get("/recent", TaskController.getRecentTasks);

// GET a single task by ID
router.get("/:id", TaskController.GetOneTask);

// CREATE a new task
router.post("/", TaskController.CreateTask);

// UPDATE an existing task by ID
router.put("/:id", TaskController.UpdateTask);

// PATCH update
router.patch("/:id", TaskController.UpdateAllTasks);

// DELETE a task by ID
router.delete("/:id", TaskController.DeleteTask);


export default router;
