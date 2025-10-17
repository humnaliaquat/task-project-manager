import { Router } from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();
router.use(verifyToken);
router.get("/info",UserController.getUserInfo );
router.put("/update",UserController.updateUserInfo);
router.delete("/delete",UserController.deleteUser);

export default router; 