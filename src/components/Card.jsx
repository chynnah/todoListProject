import React from "react";
import { Star, CheckCircle, Edit, Trash } from "lucide-react";

const Card = ({ task, updateTaskStatus, deleteTask, setEditingTask, setIsModalOpen }) => {
  return (
    <div className="p-7 rounded-lg border border-[#DDD9D9] flex justify-between items-center mb-3">
      {/* Task Name */}
      <h3
        className={`text-lg font-medium relative ${
          task.status === "completed" ? "line-through text-gray-400" : "text-[#3E3F5B]"
        } max-h-[60px] max-w-[200px] overflow-hidden`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          position: "relative",
        }}
      >
        {task.task}
        <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></span>
      </h3>



      {/* Icons */}
      <div className="flex gap-3">

        {/* Favorite */}
        <Star
          size={18}
          className={`cursor-pointer ${task.is_favorite ? "text-yellow-500" : "text-gray-500"}`}
          onClick={() => updateTaskStatus(task.id, null, task.is_favorite ? 0 : 1)} 
        />

        {/* Mark Completed */}
        <CheckCircle
          size={18}
          className={`cursor-pointer ${task.status === "completed" ? "text-green-500" : "text-gray-500"}`}
          onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
        />

        {/* Edit */}
        <Edit
          size={18}
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setEditingTask(task); // Set the task being edited
            setIsModalOpen(true);
          }}
        />


        {/* Delete */}
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
