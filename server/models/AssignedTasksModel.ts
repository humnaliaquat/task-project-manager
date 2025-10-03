import mongoose from "mongoose";

const AssignedTaskSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
    trim: true,
  },
  description: {
      type: String,
      default: "",
    },
    isTrashed: { type: Boolean, default: false },
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

)
const AssignedTasksModel = mongoose.model("Assigned", AssignedTaskSchema);
export default AssignedTasksModel;