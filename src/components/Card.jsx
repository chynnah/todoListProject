import React from "react";
import { Star, CheckCircle, Edit, Trash, Calendar } from "lucide-react";

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
    <div className="p-4 rounded-lg border border-[#DDD9D9] flex flex-col mb-3 w-full max-w-[390px] bg-[#FDFAF6]">
      {/* Category Badge with Emoji */}
      <span className="px-2 py-1 text-xs font-semibold rounded-full mb-2 self-start flex items-center gap-1">
        {categoryEmoji} {categoryName}
      </span>

      {/* Task Name */}
      <h3
        className={`text-lg font-medium ${task.status === "completed" ? "line-through text-gray-400" : "text-[#3E3F5B]"}`}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          whiteSpace: "normal",
        }}
      >
        {task.task}
      </h3>

      

      {/* Display Date and Time */}
      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
        <Calendar size={16} className="text-gray-500" />
        {task.updated_at
          ? `Updated: ${new Date(task.updated_at).toLocaleString()}`
          : `Created: ${new Date(task.created_at || Date.now()).toLocaleString()}`}
      </p>

      {/* Deadline Display */}
      {task.deadline && (
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <Calendar size={16} className="text-gray-500" />
          Deadline: {new Date(task.deadline).toLocaleString()}
        </p>
      )}

      {/* Icons */}
      <div className="flex gap-2 flex-shrink-0 mt-3">
        <Star
          size={18}
          className={`cursor-pointer ${task.is_favorite ? "text-yellow-500" : "text-gray-500"}`}
          onClick={() => updateTaskStatus(task.id, null, task.is_favorite ? 0 : 1)}
        />
        <CheckCircle
          size={18}
          className={`cursor-pointer ${task.status === "completed" ? "text-green-500" : "text-gray-500"}`}
          onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
        />
        <Edit
          size={18}
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
        />
        <Trash
          size={18}
          className="text-red-500 cursor-pointer"
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
};


export default Card;
