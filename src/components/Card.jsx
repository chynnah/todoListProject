import React from "react";
import { PencilAltIcon, StarIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/outline"; // Heroicons

import { Calendar } from "lucide-react"; // Calendar icon (from lucide-react)

const Card = ({ task, updateTaskStatus, deleteTask, setEditingTask, setIsModalOpen }) => {
  const categoryEmojis = {
    Work: "💼",
    Personal: "🏡",
    Shopping: "🛒",
    Fitness: "🏋️",
    Health: "🩺",
    Urgent: "⚠️",
    Hobby: "🎨",
    Education: "🎓",
    Home: "🏠",
    Travel: "✈️",
    Finance: "💰",
    Events: "📅",
    Social: "🤝",
    Career: "🚀",
    SelfCare: "💆",
    Maintenance: "🔧",
  };

  const categoryName = task.category && task.category !== "null" ? task.category : "Uncategorized";
  const categoryEmoji = categoryEmojis[categoryName] || "📌";

  return (
    <div className="p-6 rounded-xl border border-[#E0E0E0] flex mb-6 w-full max-w-[390px] bg-[#FFFFFF] shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Main Content - Left Side */}
      <div className="flex flex-col flex-grow pr-4 overflow-hidden">
        {/* Category Badge with Emoji */}
        <span className="text-xs font-semibold mb-3 self-start flex items-center gap-2 text-[#3E3F5B]">
          {categoryEmoji} {categoryName}
        </span>

        {/* Task Name */}
        <h3
          className={`text-lg font-semibold mb-3 ${task.status === "completed" ? "line-through text-gray-400" : "text-[#3E3F5B]"}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            position: "relative",
            background: "linear-gradient(to bottom, transparent, white 50%)",
            paddingBottom: "1rem",
          }}
        >
          {task.task}
        </h3>

        {/* Display Date and Time */}
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
          <Calendar size={16} className="text-gray-500" />
          {task.updated_at
            ? `Updated: ${new Date(task.updated_at).toLocaleString()}`
            : `Created: ${new Date(task.created_at || Date.now()).toLocaleString()}`}
        </p>

        {/* Deadline Display */}
        {task.deadline && (
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar size={16} className="text-gray-500" />
            Deadline: {new Date(task.deadline).toLocaleString()}
          </p>
        )}
      </div>

      {/* Icons - Right Side */}
      <div className="flex flex-col gap-3 mt-4 items-end">
        <StarIcon
          className={`w-5 h-5 cursor-pointer transition-all duration-300 transform ${task.is_favorite ? "text-yellow-500" : "text-gray-500 hover:text-yellow-400"}`}
          onClick={() => updateTaskStatus(task.id, null, task.is_favorite ? 0 : 1)}
        />
        <CheckCircleIcon
          className={`w-5 h-5 cursor-pointer transition-all duration-300 transform ${task.status === "completed" ? "text-green-500" : "text-gray-500 hover:text-green-400"}`}
          onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
        />
        <PencilAltIcon
          className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors duration-200"
          onClick={() => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
        />
        <TrashIcon
          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-200"
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
};

export default Card;
