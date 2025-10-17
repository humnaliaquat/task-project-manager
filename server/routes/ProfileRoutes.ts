import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/authMiddleware";
import ProfileController from "../controllers/ProfileController";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(verifyToken);

router.get("/info", ProfileController.getProfile);
router.put("/update", upload.single("profilePic"), ProfileController.updateProfile);

export default router;


