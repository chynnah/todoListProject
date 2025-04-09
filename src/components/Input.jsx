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
      <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#283D3B] text-2xl font-semibold tracking-tight">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose} className="text-[#FF1654] hover:text-[#FF1654] text-xl">
            ✏️
          </button>
        </div>

        {/* Task Input */}
        <input
          type="text"
          placeholder="Enter task..."
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF1654] focus:ring-opacity-60 transition-all duration-300 ease-in-out"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {/* Category Selection */}
        <select
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] bg-[#F9FAFB] border border-[#DDD9D9] focus:outline-none focus:ring-2 focus:ring-[#FF1654] transition-all duration-300 ease-in-out"
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
          className="w-full p-4 mb-5 rounded-lg text-[#283D3B] bg-[#F9FAFB] border border-[#DDD9D9] focus:outline-none focus:ring-2 focus:ring-[#FF1654] transition-all duration-300 ease-in-out"
        />

        {/* Date and Time */}
        <div className="text-[#6B6B6B] text-sm mb-5">{dateTime}</div>

        {/* Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            className="px-6 py-3 text-[#283D3B] bg-[#F1F3F5] rounded-lg hover:bg-[#FF1654] hover:text-white transition-all duration-300 ease-in-out"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-[#FF1654] text-white rounded-lg hover:bg-[#FF0038] transition-all duration-300 ease-in-out"
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
