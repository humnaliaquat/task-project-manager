import { Request, Response } from "express";
import ProjectsModel from "../models/ProjectsModel";

// Get all projects
const GetProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectsModel.find();
    res.json(projects); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a project
const CreateProjects = async (req: Request, res: Response) => {
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
    const project = await ProjectsModel.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json(project); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// delete project
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
// update project
const UpdateProject = async (req: Request, res: Response) => {
  try{
    const project = await ProjectsModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(project);
  }catch(err:any){
    res.status(400).json({error:err.message});
  }
}
export default { GetProjects, CreateProjects, GetOneProject, DeleteProject ,UpdateProject};
