import { Router } from "express";
import TaskController from "../controllers/TaskController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();

router.use(verifyToken);

// GET all tasks
router.get("/", verifyToken, TaskController.GetAllTasks);
//Get stats
router.get("/stats", verifyToken, TaskController.GetTaskStats);
// recent task 
router.get("/recent", verifyToken, TaskController.getRecentTasks);
// trashed tasks
router.get("/trashed", verifyToken, TaskController.GetTrashedTasks);

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

// Trash operations
router.put("/:id/trash", verifyToken, TaskController.MoveTaskToTrash);
router.put("/:id/restore", verifyToken, TaskController.RestoreTask);
router.delete("/:id/permanent", verifyToken, TaskController.PermanentlyDeleteTask);


export default router;
