import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import TrashController from "../controllers/TrashController";

const router = Router();

// All routes require authentication
router.use(verifyToken);

router.get("/", TrashController.getAllTrashedItems);
router.post("/bulk-restore", TrashController.bulkRestore);
router.post("/bulk-delete", TrashController.bulkPermanentDelete);
router.delete("/empty", TrashController.emptyTrash);

export default router;
