import { Request, Response } from "express";
import ProjectsModel from "../models/ProjectsModel";
import mongoose from "mongoose";

// Get all projects
const GetProjects = async (req: Request, res: Response) => {
  try {
    const projectsWithTaskCount = await ProjectsModel.aggregate([
      {
        $lookup: {
          from: "tasks", // your MongoDB collection name for tasks
          localField: "_id",
          foreignField: "projectId",
          as: "tasks",
        },
      },
      {
        $addFields: {
          totaltasks: { $size: "$tasks" },
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
    const project = new ProjectsModel(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
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
          totaltasks: { $size: "$tasks" } 
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

// move to trash
export const MoveToTrash = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      { isTrashed: true },
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
      { isTrashed: false },
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
  RestoreProject
};
