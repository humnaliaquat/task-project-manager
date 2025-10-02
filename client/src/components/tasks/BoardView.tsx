import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MoreHorizontal, Plus } from "lucide-react";
import axios from "axios";
import { handleError } from "../../utils/utils";

type Task = {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status: "todo" | "inprogress" | "completed";
};

type Props = {
  tasks: Task[];
  loading: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // <--- get from parent
};

export default function BoardView({ tasks, loading, setTasks }: Props) {
  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "border-l-violet-500",
      dot: "bg-violet-500",
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "border-l-yellow-500",
      dot: "bg-yellow-500",
    },
    {
      id: "completed",
      title: "Completed",
      color: "border-l-green-500",
      dot: "bg-green-500",
    },
  ];

  // Helper: reorder list
  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    setTasks((prev) => {
      const sourceTasks = prev.filter(
        (task) => task.status === source.droppableId
      );

      // Moving within the same column
      if (source.droppableId === destination.droppableId) {
        const reordered = reorder(sourceTasks, source.index, destination.index);
        return prev.map((task) =>
          task.status !== source.droppableId
            ? task
            : reordered.find((t) => t._id === task._id) || task
        );
      }

      // Moving across columns
      const newStatus = destination.droppableId as Task["status"];

      // Optimistic update
      const updatedTasks = prev.map((task) =>
        task._id === draggableId ? { ...task, status: newStatus } : task
      );

      // Persist to backend
      axios
        .patch(`http://localhost:3000/tasks/${draggableId}`, {
          status: newStatus,
        })
        .catch((err) => {
          handleError(err.message || "Failed to update task status");
          // ❌ revert back if error
          setTasks(prev);
        });

      return updatedTasks;
    });
  };

  if (loading) {
    return <p className="text-center py-6">Loading tasks...</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => {
          const filteredTasks = tasks.filter((task) => task.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${col.dot}`}></span>
                  <h2 className="font-semibold text-gray-800">{col.title}</h2>
                </div>
                <button className="text-gray-400 cursor-pointer hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={col.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-3 flex-1 min-h-[100px] max-h-[600px] overflow-y-auto"
                  >
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 border-l-4 ${
                                col.color
                              } ${
                                snapshot.isDragging
                                  ? "shadow-lg scale-[1.02] border-l-8"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-gray-700">
                                  {task.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="accent-violet-600 cursor-pointer"
                                  />
                                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mb-2">
                                {task.description || "No description"}
                              </p>
                              <div className="flex justify-between text-xs text-gray-500">
                                <p>
                                  {task.dueDate
                                    ? new Date(task.dueDate).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        }
                                      )
                                    : "No due date"}
                                </p>
                                <p
                                  className={`font-medium ${
                                    task.priority === "High"
                                      ? "text-red-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {task.priority || "—"}
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic text-center py-4">
                        No tasks yet
                      </p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Add Task Button */}
              <button className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-violet-400 cursor-pointer text-violet-600 rounded-lg hover:bg-violet-50 transition">
                <Plus size={16} />
                <span className="text-sm font-medium">Add Task</span>
              </button>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
