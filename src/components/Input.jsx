import React, { useState, useEffect } from "react";

const Input = ({ isOpen, onClose, onAddTask, onEditTask, editingTask, categories }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [deadline, setDeadline] = useState(""); // State for deadline

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

  useEffect(() => {
    if (isOpen && editingTask) {
      setTask(editingTask.task);
      setCategory(editingTask.category || "");
      setDeadline(editingTask.deadline || "");
    } else {
      setTask("");
      setCategory(""); 
      setDeadline(""); 
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
          className="w-full p-2 mb-4 rounded-lg outline-none resize-none overflow-auto h-20 "
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {/* Category Selection */}
        <select
          className="border border-[#DDD9D9] rounded p-2 w-full max-h-20 overflow-y-auto"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Deadline Input */}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 mt-4 border rounded-lg"
        />

        {/* Date and Time */}
        <div className="text-gray-500 text-sm mb-4 mt-5">{dateTime}</div>

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
              if (task.trim() !== "" && category.trim() !== "") {
                if (editingTask) {
                  onEditTask(editingTask.id, task, category, deadline); 
                } else {
                  onAddTask({
                    task,
                    category,
                    dateTime,
                    deadline, 
                    status: "pending",
                  });
                }
                setTask("");
                setCategory(""); 
                setDeadline(""); // Reset fields
                onClose();
              } else {
                alert("Task and category are required.");
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
