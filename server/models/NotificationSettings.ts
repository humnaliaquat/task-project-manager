import mongoose from "mongoose";

const NotificationSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskReminders: { type: Boolean, default: true },
  dueDateAlerts: { type: Boolean, default: true },
  emailUpdates: { type: Boolean, default: true },
});

export default mongoose.model("NotificationSettings", NotificationSettingsSchema);
