import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  Bell,
  Check,
  Trash2,
  Folder,
  ListTodo,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Notification {
  _id: string;
  type:
    | "project_created"
    | "project_updated"
    | "project_deleted"
    | "task_created"
    | "task_updated"
    | "task_deleted"
    | "task_due_soon";
  title: string;
  message: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "project_created":
    case "project_updated":
    case "project_deleted":
      return <Folder className="h-4 w-4 text-blue-500" />;
    case "task_created":
    case "task_updated":
    case "task_deleted":
      return <ListTodo className="h-4 w-4 text-green-500" />;
    case "task_due_soon":
      return <Clock className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "project_created":
    case "task_created":
      return "bg-green-50 border-green-200";
    case "project_updated":
    case "task_updated":
      return "bg-blue-50 border-blue-200";
    case "project_deleted":
    case "task_deleted":
      return "bg-red-50 border-red-200";
    case "task_due_soon":
      return "bg-orange-50 border-orange-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

export default function NotificationsDropdown() {
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!authUser || !authUser.token) {
      console.error("User not found or missing token. Please log in.");
      return;
    }

    const newSocket = io("http://localhost:3000", {
      auth: {
        token: authUser.token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to notification server");
      // Join user's personal room
      newSocket.emit("join-user-room", authUser.id);
    });

    newSocket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      toast.info(notification.title);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from notification server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authUser?.token, authUser?.id]);

  // Fetch notifications on mount
  useEffect(() => {
    if (!authUser?.token) return;
    fetchNotifications();
  }, [authUser?.token]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/notifications", {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notifications");

      const data = await res.json();
      setNotifications(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to mark as read");

      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("http://localhost:3000/notifications/read-all", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to mark all as read");

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (err: any) {
      toast.error(err.message || "Failed to mark all as read");
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/notifications/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete notification");

      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete notification");
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed top-6 bottom-6 h-auto w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-violet-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Notifications
          </p>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="p-1.5 rounded-md hover:bg-violet-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
              title="Mark all as read"
            >
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 max-h-96">
        {isLoading ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-3 rounded-md border cursor-pointer transition ${
                notification.isRead
                  ? "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
              } ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          notification.isRead
                            ? "text-gray-600 dark:text-gray-300"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          title="Mark as read"
                        >
                          <Check
                            size={14}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                        title="Delete"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {notifications.length} total notifications
          </p>
          <button
            onClick={fetchNotifications}
            className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
