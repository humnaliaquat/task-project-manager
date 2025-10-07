import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// ✅ Signup Validation
const signupValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(), // 6+ for better security
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Invalid signup data",
      error: error.details[0].message,
    });
  }

  next();
};

// ✅ Login Validation
const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Invalid login data",
      error: error.details[0].message,
    });
  }

  next();
};

export default { loginValidation, signupValidation };
