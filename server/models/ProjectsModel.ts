import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema(
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
    isTrashed: { type: Boolean, default: false },
      deletedOn: { type: Date, default: null },
     priority: {
      type: String,
      enum: ["low", "medium", "high"], 
      lowercase: true, 
      trim: true, 
      default: "medium", 
    },
    inChargeName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    dueDate: {
      type: Date,
    },
    progress: {
  type: Number,
  default: 0, 
  min: 0,
  max: 100
},  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectsModel = mongoose.model("Project", ProjectsSchema);

export default ProjectsModel;
