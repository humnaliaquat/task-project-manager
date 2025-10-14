import { Request, Response } from "express";
import ProjectsModel from "../models/ProjectsModel";
import mongoose from "mongoose";

//Get Stats
export const GetProjectsStats = async (req: Request, res: Response) => {
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
      ProjectsModel.countDocuments({ userId }),
      ProjectsModel.countDocuments({ userId, status: "Completed" }),      
      ProjectsModel.countDocuments({ userId, status: "In Progress" }),     
      ProjectsModel.countDocuments({ userId, status: "To Do" }),          
      ProjectsModel.countDocuments({
        userId,
        dueDate: { $gte: startOfDay, $lt: endOfDay },
      }),
    ]);

    res.status(200).json({
      totalCount,
      completedCount,
      inProgressCount,
      pendingCount: toDoCount, 
      dueTodayCount,
    });
  } catch (error: any) {
    console.error("❌ Error fetching task stats:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// Get all projects
const GetProjects = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 

    const projectsWithTaskCount = await ProjectsModel.aggregate([
     
      {
        $match: {
          userId: new mongoose.Types.ObjectId(String(userId))
,
          isTrashed: false,
        },
      },
     
      {
        $lookup: {
          from: "tasks", 
          localField: "_id",
          foreignField: "projectId",
          as: "tasks",
        },
      },
      
      {
       $addFields: {
  totalTasks: { $size: "$tasks" },
}

      },
      {
        $project: {
          tasks: 0,
        },
      },
    ]);

    if (!projectsWithTaskCount || projectsWithTaskCount.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    res.status(200).json(projectsWithTaskCount);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a project
const CreateProject = async (req: Request, res: Response) => {
  try {
    
    const userId = (req as any).user.id;

    
    const project = new ProjectsModel({
      ...req.body,
      userId, 
    });

    await project.save();

    res.status(201).json(project);
  } catch (error: any) {
    console.error("Error creating project:", error);
    res.status(400).json({ error: error.message });
  }
};


// Get one project by ID
const GetOneProject = async (req: Request, res: Response) => {
  try {
    const projectWithTasks = await ProjectsModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) } 
      },
      {
        $lookup: {
          from: "tasks", 
          localField: "_id",
          foreignField: "projectId",
          as: "tasks"
        }
      },
      {
        $addFields: {
         $totalTasks: { $size: "$tasks" }, 
        }
      },
      {
        $project: { tasks: 0 } 
      }
    ]);

    if (!projectWithTasks || projectWithTasks.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(projectWithTasks[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Update project
const UpdateProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete project
const DeleteProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsModel.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully", project });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Get all trashed projects
const GetTrashedProjects = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const trashedProjects = await ProjectsModel.find({ userId, isTrashed: true });

    if (!trashedProjects || trashedProjects.length === 0) {
      return res.status(404).json({ message: "No trashed projects found" });
    }

    res.status(200).json(trashedProjects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// move to trash
export const MoveToTrash = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      { isTrashed: true, deletedOn: new Date() }, 
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// restore project
const RestoreProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      { isTrashed: false, deletedOn: null }, 
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  GetProjects,
  CreateProject,
  GetOneProject,
  UpdateProject,
  DeleteProject,
  MoveToTrash,
  RestoreProject,
  GetProjectsStats,
  GetTrashedProjects
};
