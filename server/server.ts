import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import cron from "node-cron";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter";
import ProjectsRoutes from "./routes/ProjectsRoutes";
import TasksRoutes from "./routes/TasksRoutes";
import UserRoutes from "./routes/UserRouter";
import ProfileRoutes from "./routes/ProfileRoutes";
import AccountRoutes from "./routes/AccountRoutes";
import AssignedTasksRoutes from "./routes/AssignedTasks";

// DB connection
import "./models/db";
import TasksModel from "./models/TasksModel";
import ProjectsModel from "./models/ProjectsModel"; // Ensure you have ProjectsModel if needed

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create the HTTP server and attach socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], 
  },
});
app.set("io", io); // Store io instance in app

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Cron job that checks for due tasks
cron.schedule("*/30 * * * *", async () => {
  const now = new Date();
  const soon = new Date(now.getTime() + 60 * 60 * 1000); // tasks due within the next hour

  try {
    const dueTasks = await TasksModel.find({ dueDate: { $lte: soon, $gte: now } });

    if (dueTasks.length > 0) {
      const io = app.get("io"); // Get the io instance

      if (io) {
        io.emit("task_due_soon", dueTasks); // Emit the event if io is available
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

// Use routes
app.use("/auth", AuthRouter);
app.use("/projects", ProjectsRoutes);
app.use("/tasks", TasksRoutes);
app.use("/assigned", AssignedTasksRoutes);
app.use("/user", UserRoutes);
app.use("/profile", ProfileRoutes);
app.use("/account", AccountRoutes);

// Default home route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome! 🚀 Your server is running.");
});

// Ping route for health check
app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
