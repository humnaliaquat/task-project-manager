import { Request, Response, Router } from "express";
import AssignedTasksModel from "../models/AssignedTasksModel";

const router = Router();

// Get all assigned tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await AssignedTasksModel.find();
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const task = await AssignedTasksModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an assigned task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await AssignedTasksModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a task
router.post("/", async (req: Request, res: Response) => {
  try {
    const task = new AssignedTasksModel(req.body); 
    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
