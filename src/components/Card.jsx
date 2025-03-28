import React from "react";
import { Star, CheckCircle, Edit, Trash } from "lucide-react";

const Card = ({ task, updateTaskStatus, deleteTask, editTask }) => {
  return (
    <div className="p-7 rounded-lg border border-[#DDD9D9] flex justify-between items-center mb-3">
      {/* Task Name */}
      <h3
        className={`text-lg font-medium ${
          task.status === "completed" ? "line-through text-gray-400" : "text-[#3E3F5B]"
        }`}
      >
        {task.task}
      </h3>

      {/* Icons */}
      <div className="flex gap-3">
        {/* Favorite */}
        <Star
          size={18}
          className={`cursor-pointer ${task.status === "favorite" ? "text-yellow-500" : "text-gray-500"}`}
          onClick={() => updateTaskStatus(task.id, "favorite")}
        />

        {/* Mark Completed */}
        <CheckCircle
          size={18}
          className="text-green-500 cursor-pointer"
          onClick={() => updateTaskStatus(task.id, "completed")}
        />

        {/* Edit */}
        <Edit
          size={18}
          className="text-blue-500 cursor-pointer"
          onClick={() => editTask(task.id)}
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
