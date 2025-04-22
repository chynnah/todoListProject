import React, { useState, useEffect } from "react"; 
import { Calendar, Clock, Tag, CheckCircle, X } from "lucide-react";

const Input = ({ isOpen, onClose, onAddTask, onEditTask, editingTask, categories }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [deadline, setDeadline] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-full sm:w-4/5 md:w-3/4 lg:w-[450px] max-w-[450px] transition-all">
        {/* Header */}
        <div className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main content */}
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Task Input */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="task" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <CheckCircle size={14} />
              Task
            </label>
            <input
              id="task"
              type="text"
              placeholder="What needs to be done?"
              className="w-full p-2 sm:p-3 rounded-md text-gray-800 dark:text-gray-200 
                        placeholder-gray-400 dark:placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                        bg-white dark:bg-gray-700 
                        border border-gray-200 dark:border-gray-600"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          {/* Custom Category Dropdown */}
          <div className="space-y-1 sm:space-y-2 relative" ref={dropdownRef}>
            <label htmlFor="category" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Tag size={14} />
              Category
            </label>
            <button
              type="button"
              className="w-full p-2 sm:p-3 rounded-md text-gray-800 dark:text-gray-200 
                        bg-white dark:bg-gray-700 
                        border border-gray-200 dark:border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate">
                {category ? `${categoryEmojis[category] || "📌"} ${category}` : "Select a Category"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 z-10 max-h-40 md:max-h-100 overflow-y-auto
                          bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                          rounded-md shadow-lg">
                <ul className="py-1">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600
                                ${category === cat.name ? "bg-gray-100 dark:bg-gray-600" : ""}`}
                      onClick={() => {
                        setCategory(cat.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{categoryEmojis[cat.name] || "📌"}</span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Deadline Input */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="deadline" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar size={14} />
              Deadline
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-md text-gray-800 dark:text-gray-200 
                        bg-white dark:bg-gray-700 
                        border border-gray-200 dark:border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Date and Time */}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Clock size={12} className="text-gray-400 dark:text-gray-500" />
            {dateTime}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 bg-gray-50/80 dark:bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 dark:border-gray-700 rounded-b-lg">
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-xs sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-white font-medium text-xs sm:text-sm rounded-md transition-colors 
                       bg-[#A31621] hover:bg-[#8C131C] dark:bg-[#FF4757] dark:hover:bg-[#FF2A3A] "
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
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;