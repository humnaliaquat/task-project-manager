import express from "express";
import NotificationSettings from "../models/NotificationSettings";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ GET user settings
router.get("/", verifyToken, async (req, res) => {
  try {

    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}
const userId = (req.user as any).id;

    const settings =
      (await NotificationSettings.findOne({ userId })) ||
      (await NotificationSettings.create({ userId }));
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load settings" });
  }
});

// ✅ UPDATE user settings
router.put("/", verifyToken, async (req, res) => {
  const userId = (req.user as any).id;
  try {
    const updated = await NotificationSettings.findOneAndUpdate(
      { userId },
      {
        taskReminders: req.body.taskReminders,
        dueDateAlerts: req.body.dueDateAlerts,
        emailUpdates: req.body.emailUpdates,
      },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings" });
  }
});

export default router;
