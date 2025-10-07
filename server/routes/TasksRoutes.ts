import { Router } from "express";
import TaskController from "../controllers/TaskController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();

router.use(verifyToken);

// GET all tasks
router.get("/", verifyToken, TaskController.GetAllTasks);

// recent task 
router.get("/recent", verifyToken, TaskController.getRecentTasks);

// GET a single task by ID
router.get("/:id", verifyToken, TaskController.GetOneTask);

// CREATE a new task
router.post("/",verifyToken, TaskController.CreateTask);

// UPDATE an existing task by ID
router.put("/:id",verifyToken, TaskController.UpdateTask);

// PATCH update
router.patch("/:id",verifyToken, TaskController.UpdateAllTasks);

// DELETE a task by ID
router.delete("/:id",verifyToken, TaskController.DeleteTask);


export default router;
