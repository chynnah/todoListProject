import React, { useState, useEffect } from "react";

const Input = ({ isOpen, onClose, onAddTask, onEditTask, editingTask }) => {
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Update date and time when modal opens
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDateTime(`${formattedDate} • ${formattedTime}`);
    }
  }, [isOpen]);

  // Set task input when editing
  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setTask(editingTask.task); 
      } else {
        setTask(""); 
      }
    }
  }, [isOpen, editingTask]);

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-[450px] shadow-lg">
        {/* Title */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✏️
          </button>
        </div>

        {/* Task Input */}
        <input
          type="text"
          placeholder="Enter task..."
          className="w-full p-2 mb-4 rounded-lg outline-none resize-none overflow-auto h-20"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {/* Date and Time */}
        <div className="text-gray-500 text-sm mb-4">{dateTime}</div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            onClick={() => {
              if (task.trim() !== "") {
                if (editingTask) {
                  onEditTask(editingTask.id, task); 
                } else {
                  onAddTask({
                    id: Date.now(),
                    task,
                    dateTime,
                    status: "pending",
                  });
                }
                setTask("");
                onClose();
              }
            }}
            >
            {editingTask ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
