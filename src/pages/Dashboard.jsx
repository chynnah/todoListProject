import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import { Plus, Filter, ChevronDown, Sparkles } from "lucide-react";
import TaskLegend from "../components/TaskLegend";
import DateDisplay from "../components/DateDisplay";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [categories, setCategories] = useState([]);  
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Get greeting emoji based on time of day
  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅"; // morning
    if (hour < 18) return "☀️"; // afternoon
    return "🌙"; // evening
  };
  
  // Get greeting text based on time of day
  const getGreetingText = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = () => {
      fetch("http://localhost:3000/backend/api/tasks/get_categories.php", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.categories) {
            setCategories(data.categories);
          } else {
            console.error("Error fetching categories:", data.message);
          }
        })
        .catch((err) => console.error("Error fetching categories:", err));
    };
  
    fetchCategories();
  }, []);

  // Fetch Tasks
  const fetchTasks = () => {
    const userId = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/backend/api/tasks/get_tasks.php?user_id=${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks(
            data.tasks.map((task) => ({
              ...task,
              is_favorite: task.is_favorite === 1,
              category: task.category || "Uncategorized", 
            }))
          );
        } else {
          console.error("Error fetching tasks:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = (taskData) => {
    if (!taskData.task) {
      alert("Please provide a task.");
      return;
    }
    const category = categories.find((c) => c.name === taskData.category);
    const categoryId = category ? category.id : null;

    fetch("http://localhost:3000/backend/api/tasks/add_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task: taskData.task,
        category_id: categoryId,
        deadline: taskData.deadline,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks();
        setIsModalOpen(false);
        setEditingTask(null);
        setSelectedCategory('All');
      } else {
        console.error("Error adding task:", data.message);
      }
    })
    .catch((err) => console.error("Request failed:", err));
  };
  
  // Update task
  const updateTaskStatus = (taskId, newStatus, isFavorite = null) => {
    fetch("http://localhost:3000/backend/api/tasks/update_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task_id: taskId,
        ...(isFavorite !== null ? { is_favorite: isFavorite } : { status: newStatus }),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks();
        }
      });
  };

  // Archive task (instead of delete)
  const archiveTask = (taskId) => {
    fetch("http://localhost:3000/backend/api/tasks/archive_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ task_id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks();
        } else {
          console.error("Error archiving task:", data.message);
        }
      })
      .catch((err) => console.error("Error archiving task:", err));
  };

  // Edit task
  const editTask = (taskId, newTaskText, newCategory, newDeadline) => {
    const category = categories.find(c => c.name === newCategory);
    const categoryId = category ? category.id : null;

    fetch("http://localhost:3000/backend/api/tasks/edit_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task_id: taskId,
        task: newTaskText,
        category_id: categoryId,
        deadline: newDeadline, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prevTasks) => 
            prevTasks.map((task) =>
              task.id === taskId
                ? { ...task, task: newTaskText, category: newCategory, deadline: newDeadline } 
                : task
            )
          );
          setIsModalOpen(false);
          setEditingTask(null);
        }
      })
      .catch((err) => console.error("Error editing task:", err));
  };
  
  // Filter tasks by category
  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'All' || task.category === selectedCategory
  );
  
  // Get categories from tasks
  const uniqueCategories = ['All', ...new Set(tasks.map(task => task.category).filter(Boolean))];
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  return (
    <div className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors min-h-screen max-w-screen  md:min-w-full ">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Welcome Banner */}
      <div className="mt-2 md:mt-3 lg:mt-4 mx-4 md:mx-5 lg:mx-6 flex justify-end">
        <div className={`bg-gradient-to-r from-[#A31621] to-[#D64045] dark:from-[#FF4757] dark:to-[#FF6B6B] 
                        px-4 py-2 md:px-5 lg:px-6 md:py-2.5 lg:py-3 
                        rounded-t-[30px] rounded-bl-[30px] 
                        flex items-center gap-2 shadow-md 
                        w-fit md:w-auto transition-all duration-300`}>
          <span className="text-base md:text-base lg:text-lg">{getGreetingEmoji()}</span>
          <h1 className="text-white text-sm md:text-sm lg:text-base font-medium flex items-center gap-1 md:gap-1.5 lg:gap-2 truncate">
            {getGreetingText()}, {username}!
            <Sparkles size={14} className="text-yellow-300 hidden md:block" />
          </h1>
        </div>
      </div>
      
      {/*Date Display*/}
      <DateDisplay />

      {/* Task Legend */}
      <div className="my-4 md:my-5 lg:my-6">
        <TaskLegend className="hidden md:block" />
      </div>
      {/* Control Bar */}
      <div className="px-3 md:px-5 lg:px-6 flex flex-row justify-between items-center md:pr-5 lg:pr-6 mt-4 gap-2 md:gap-2 lg:gap-0">
        {/* Add Task Button*/}
        <button 
          className="h-8 md:h-10 w-auto flex justify-center items-center gap-1 md:gap-2 cursor-pointer rounded-lg transition-all transform hover:scale-105 active:scale-95 bg-transparent dark:bg-transparent"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={14} className="stroke-[#053C5E]/70 dark:stroke-white md:size-6" />
          <h4 className="text-[#053C5E]/70 font-semibold text-sm md:text-base lg:text-lg dark:text-white">
            Add Task
          </h4>
        </button>
        
        {/* Category Dropdown */}
        <div className="dropdown-container relative w-auto ml-auto">
          <button 
            className="h-8 md:h-10 px-2 md:px-3 bg-white hover:bg-[#A9BFA8]/30 text-[#053C5E]/70 font-medium text-xs md:text-sm rounded-lg flex items-center justify-between gap-1 md:gap-2 border border-[#A9BFA8] dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-1 md:gap-2 flex-1">
              <span className="truncate max-w-24 md:max-w-full">Category: {selectedCategory}</span>
            </div>
            <ChevronDown size={14} className={`dark:text-gray-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>
            
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[#A9BFA8] dark:border-gray-700 z-50">
              <ul className="py-1 overflow-y-auto">
                {uniqueCategories.map((category, index) => (
                  <li 
                    key={index}
                    className={`px-3 py-1.5 text-xs md:text-sm cursor-pointer hover:bg-[#FAFFC5] dark:hover:bg-gray-700 ${
                      selectedCategory === category 
                        ? 'bg-[#A9BFA8]/20 dark:bg-gray-700' 
                        : 'dark:text-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-4 md:mt-5 lg:mt-6 px-2 sm:px-3 md:px-4 max-w-full overflow-hidden">
        <Tabs
          tasks={filteredTasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={archiveTask}
          editTask={editTask}
          setEditingTask={setEditingTask}
          setIsModalOpen={setIsModalOpen}
          searchQuery={searchQuery}
        />
      </div>

      <Input
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onAddTask={addTask}
        onEditTask={editTask}
        editingTask={editingTask}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;