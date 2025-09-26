import { Router, Request, Response } from "express";
import validation from "../middleware/AuthValidation";
import AuthController from "../controllers/AuthController";
const router = Router();

// Login route
router.post("/login", validation.loginValidation, AuthController.login);

// Signup route
router.post("/signup", validation.signupValidation, AuthController.signup);

// Test route
router.get("/login", (req: Request, res: Response) => {
  res.send("Login GET route working 🚀");
});
router.get("/signup", (req: Request, res: Response) => {
  res.send("Signup GET route working 🚀");
});

export default router;
