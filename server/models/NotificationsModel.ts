import mongoose from "mongoose";

export interface INotification {
  userId: string;
  type: 'project_created' | 'project_updated' | 'project_deleted' | 
        'task_created' | 'task_updated' | 'task_deleted' | 'task_due_soon';
  title: string;
  message: string;
  relatedId?: string; // projectId or taskId
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new mongoose.Schema<INotification>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    type: {
      type: String,
      required: true,
      enum: ['project_created', 'project_updated', 'project_deleted', 
             'task_created', 'task_updated', 'task_deleted', 'task_due_soon']
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    relatedId: {
      type: String,
      required: false
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Index for efficient queries
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, isRead: 1 });

const NotificationsModel = mongoose.model<INotification>("Notification", NotificationSchema);

export default NotificationsModel;
