import { Request, Response } from "express";
import NotificationsModel, { INotification } from "../models/NotificationsModel";

import { broadcastNotification } from "../server";
import NotificationSettings from "../models/NotificationSettings";

// GET /notifications - Get user's notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notifications = await NotificationsModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json(notifications);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /notifications/:id/read - Mark notification as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notification = await NotificationsModel.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json(notification);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /notifications/read-all - Mark all notifications as read
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await NotificationsModel.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );

    return res.status(200).json({ message: "All notifications marked as read" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /notifications/:id - Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notification = await NotificationsModel.findOneAndDelete({
      _id: id,
      userId
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification deleted" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

async function sendNotification(userId: string, notificationData: any) {
  const settings = await NotificationSettings.findOne({ userId });

  if (!settings) return;

  const { taskReminders, dueDateAlerts, emailUpdates } = settings;

  // 🔍 Check preferences dynamically
  if (
    (notificationData.type === "task_due_soon" && !taskReminders) ||
    (notificationData.type.includes("task") && !emailUpdates) ||
    (notificationData.type.includes("project") && !emailUpdates) ||
    (notificationData.type === "due_date" && !dueDateAlerts)
  ) {
    console.log("Skipping notification due to user preferences");
    return;
  }

    broadcastNotification(userId, notificationData);

}

// Helper function to create notifications (used by other controllers)
export const createNotification = async (
  userId: string,
  type: INotification['type'],
  title: string,
  message: string,
  relatedId?: string
) => {
  try {
    const notification = new NotificationsModel({
      userId,
      type,
      title,
      message,
      relatedId,
      isRead: false
    });

    await notification.save();
    
    // Broadcast notification via Socket.IO
    broadcastNotification(userId, notification);
    
    return notification;
  } catch (err) {
    console.error("Error creating notification:", err);
    return null;
  }
};

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification
};
