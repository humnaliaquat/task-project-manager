import { Request, Response } from "express";

import TasksModel from "../models/TasksModel";
import ProjectsModel from "../models/ProjectsModel";
console.log("✅ TasksRoutes loaded");

export const GetTaskStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const [totalCount, completedCount, inProgressCount, toDoCount, dueTodayCount] = await Promise.all([
      TasksModel.countDocuments({ userId }),
      TasksModel.countDocuments({ userId, status: "completed" }),       // ✅ lowercase
      TasksModel.countDocuments({ userId, status: "in progress" }),     // ✅ space and lowercase
      TasksModel.countDocuments({ userId, status: "to do" }),           // ✅ renamed from 'pending'
      TasksModel.countDocuments({
        userId,
        dueDate: { $gte: startOfDay, $lt: endOfDay },
      }),
    ]);

    res.status(200).json({
      totalCount,
      completedCount,
      inProgressCount,
      pendingCount: toDoCount, // Renamed for UI clarity
      dueTodayCount,
    });
  } catch (error: any) {
    console.error("❌ Error fetching task stats:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


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
  try {
    const userId = (req as any).user.id; // from verifyToken
    const { title, description, status, priority, dueDate, projectId } = req.body;

    // ensure project exists & belongs to same user
    const project = await ProjectsModel.findOne({ _id: projectId, userId });
    if (!project) return res.status(404).json({ message: "Project not found or unauthorized" });

    const newTask = await TasksModel.create({
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      userId,
    });
 const io = req.app.get("io");
    io.emit("task_created", newTask);
    res.status(201).json(newTask);
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
     const io = req.app.get("io");
    io.emit("task_updated", task);
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
      const io = req.app.get("io");
    io.emit("task_deleted", req.params.id);
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

export default { GetAllTasks, CreateTask, GetOneTask, UpdateTask, DeleteTask , UpdateAllTasks , getRecentTasks, GetTaskStats};
