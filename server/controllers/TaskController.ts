import { Request, Response } from "express";
import TasksModel from "../models/TasksModel";
console.log("✅ TasksRoutes loaded");

export const GetAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ from token
    const tasks = await TasksModel.find({ userId });
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const CreateTask = async (req: Request, res: Response) => {
  console.log("📩 CreateTask called with body:", req.body);
  try {
    const userId = (req as any).user.id; 
    
console.log("🧠 userId from token:", userId);

    const task = new TasksModel({
      ...req.body,
      userId, 
    });

    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


const GetOneTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
const UpdateAllTasks = async (req:Request, res: Response)=>{
  try {
    const updatedTask = await TasksModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const getRecentTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
const limit = parseInt(req.query.limit as string) || 4;
const recentTasks = await TasksModel.find({ userId })
  .sort({ createdAt: -1 })
  .limit(limit);


    res.status(200).json(recentTasks);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch recent tasks", error: error.message });
  }
};

export default { GetAllTasks, CreateTask, GetOneTask, UpdateTask, DeleteTask , UpdateAllTasks , getRecentTasks};
