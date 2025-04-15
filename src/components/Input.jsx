import React, { useState, useEffect } from "react"; 

const Input = ({ isOpen, onClose, onAddTask, onEditTask, editingTask, categories }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [deadline, setDeadline] = useState(""); 

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-[450px] shadow-xl transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#283D3B] dark:text-gray-200 text-2xl font-semibold tracking-tight">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-[#FF1654] dark:text-[#FF4757] hover:text-[#FF0038] dark:hover:text-[#FF0038] text-xl transition-colors duration-200"
          >
            ✏️
          </button>
        </div>

        {/* Task Input */}
        <input
          type="text"
          placeholder="Enter task..."
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] dark:text-gray-200 placeholder-[#9E9E9E] dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF1654] dark:focus:ring-[#FF4757] focus:ring-opacity-60 transition-all duration-300 ease-in-out bg-white dark:bg-gray-700 border border-[#DDD9D9] dark:border-gray-600"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {/* Category Selection */}
        <select
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] dark:text-gray-200 bg-[#F9FAFB] dark:bg-gray-700 border border-[#DDD9D9] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF1654] dark:focus:ring-[#FF4757] transition-all duration-300 ease-in-out"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name} className="bg-white dark:bg-gray-700">
              {cat.name}
            </option>
          ))}
        </select>

        {/* Deadline Input */}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] dark:text-gray-200 bg-[#F9FAFB] dark:bg-gray-700 border border-[#DDD9D9] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF1654] dark:focus:ring-[#FF4757] transition-all duration-300 ease-in-out"
        />

        {/* Date and Time */}
        <div className="text-[#6B6B6B] dark:text-gray-400 text-sm mb-5">{dateTime}</div>

        {/* Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            className="px-6 py-3 text-[#283D3B] dark:text-gray-200 bg-[#F1F3F5] dark:bg-gray-600 rounded-lg hover:bg-[#FF1654] dark:hover:bg-[#FF4757] hover:text-white transition-all duration-300 ease-in-out"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-[#FF1654] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#FF0038] dark:hover:bg-[#E03E4E] transition-all duration-300 ease-in-out"
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
                setDeadline("");
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