import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["to do", "in progress", "completed"],
      lowercase: true,
      trim: true,
      default: "to do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], 
      lowercase: true, 
      trim: true, 
      default: "medium", 
    },

    dueDate: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const TasksModel = mongoose.model("Task", TasksSchema);
export default TasksModel;
