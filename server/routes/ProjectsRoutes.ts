import { Router } from "express";
const router = Router();
import Projects from "../controllers/ProjectsControllers"
import { verifyToken } from "../middleware/authMiddleware";
router.use(verifyToken);
router.get("/",Projects.GetProjects );
router.post("/", Projects.CreateProject);
router.get("/:id",Projects.GetOneProject);
router.delete("/:id",Projects.DeleteProject);
router.put("/:id",Projects.UpdateProject);
router.put("/:id/trash", Projects.MoveToTrash);
router.put("/:id/restore", Projects.RestoreProject);


export default router;