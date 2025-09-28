import { Router } from "express";
const router = Router();
import Projects from "../controllers/ProjectsControllers"

router.get("/",Projects.GetProjects );
router.post("/", Projects.CreateProjects);
router.get("/:id",Projects.GetOneProject);
router.delete("/:id",Projects.DeleteProject);
router.put("/:id",Projects.UpdateProject);
export default router;