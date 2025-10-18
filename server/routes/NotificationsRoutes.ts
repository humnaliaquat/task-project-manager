import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import NotificationsController from "../controllers/NotificationsController";

const router = Router();

// All routes require authentication
router.use(verifyToken);

router.get("/", NotificationsController.getNotifications);
router.put("/:id/read", NotificationsController.markAsRead);
router.put("/read-all", NotificationsController.markAllAsRead);
router.delete("/:id", NotificationsController.deleteNotification);

export default router;
