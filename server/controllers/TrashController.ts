import { Request, Response } from "express";
import ProjectsModel from "../models/ProjectsModel";
import TasksModel from "../models/TasksModel";

// GET all trashed items (both projects and tasks)
export const getAllTrashedItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const [trashedProjects, trashedTasks] = await Promise.all([
      ProjectsModel.find({ userId, isTrashed: true }),
      TasksModel.find({ userId, isTrashed: true })
    ]);

    res.status(200).json({
      projects: trashedProjects,
      tasks: trashedTasks
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk restore items
export const bulkRestore = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectIds, taskIds } = req.body;

  const results: {
  restoredProjects: any[];
  restoredTasks: any[];
  errors: string[];
} = {
  restoredProjects: [],
  restoredTasks: [],
  errors: []
};


    // Restore projects
    if (projectIds && projectIds.length > 0) {
      for (const projectId of projectIds) {
        try {
          const project = await ProjectsModel.findOneAndUpdate(
            { _id: projectId, userId, isTrashed: true },
            { isTrashed: false, deletedOn: null },
            { new: true }
          );
          if (project) {
            results.restoredProjects.push(project);
          }
        } catch (error: any) {
          results.errors.push(`Failed to restore project ${projectId}: ${error.message}`);
        }
      }
    }

    // Restore tasks
    if (taskIds && taskIds.length > 0) {
      for (const taskId of taskIds) {
        try {
          const task = await TasksModel.findOneAndUpdate(
            { _id: taskId, userId, isTrashed: true },
            { 
              isTrashed: false, 
              deletedOn: null,
              status: "to do" // Reset to default status
            },
            { new: true }
          );
          if (task) {
            results.restoredTasks.push(task);
          }
        } catch (error: any) {
          results.errors.push(`Failed to restore task ${taskId}: ${error.message}`);
        }
      }
    }

    res.status(200).json({
      message: "Bulk restore completed",
      ...results
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk permanent delete
export const bulkPermanentDelete = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectIds, taskIds } = req.body;

    const results
    : {
      deletedProjects: any[],
      deletedTasks: any [],
      errors: string[]
    } = {
      deletedProjects: [],
      deletedTasks: [],
      errors: []
    };

    // Permanently delete projects
    if (projectIds && projectIds.length > 0) {
      for (const projectId of projectIds) {
        try {
          const project = await ProjectsModel.findOneAndDelete({
            _id: projectId,
            userId,
            isTrashed: true
          });
          if (project) {
            results.deletedProjects.push(project);
          }
        } catch (error:any) {
          results.errors.push(`Failed to delete project ${projectId}: ${error.message}`);
        }
      }
    }

    // Permanently delete tasks
    if (taskIds && taskIds.length > 0) {
      for (const taskId of taskIds) {
        try {
          const task = await TasksModel.findOneAndDelete({
            _id: taskId,
            userId,
            isTrashed: true
          });
          if (task) {
            results.deletedTasks.push(task);
          }
        } catch (error:any) {
          results.errors.push(`Failed to delete task ${taskId}: ${error.message}`);
        }
      }
    }

    res.status(200).json({
      message: "Bulk permanent delete completed",
      ...results
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Empty trash (delete all trashed items)
export const emptyTrash = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const [deletedProjects, deletedTasks] = await Promise.all([
      ProjectsModel.deleteMany({ userId, isTrashed: true }),
      TasksModel.deleteMany({ userId, isTrashed: true })
    ]);

    res.status(200).json({
      message: "Trash emptied successfully",
      deletedProjects: deletedProjects.deletedCount,
      deletedTasks: deletedTasks.deletedCount
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllTrashedItems,
  bulkRestore,
  bulkPermanentDelete,
  emptyTrash
};
