import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
(req as any).user = { id: decoded._id };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
