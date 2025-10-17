import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import AccountController from "../controllers/AccountController";

const router = Router();
router.use(verifyToken);

router.get("/info", AccountController.getAccount);
router.put("/update", AccountController.updateAccount);
router.delete("/delete", AccountController.deleteAccount);

export default router;


