import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter";
import ProjectsRoutes from "./routes/ProjectsRoutes"
import TasksRoutes from "./routes/TasksRoutes"

// DB connection
import "./models/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Auth routes
app.use("/auth", AuthRouter);
//Project routes
app.use("/projects",ProjectsRoutes );
//task routes
app.use("/tasks", TasksRoutes);

// ✅ Default home route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome! 🚀 Your server is running.");
});

// Ping route
app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
