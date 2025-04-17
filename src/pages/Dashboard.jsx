import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import { Plus, Filter, ChevronDown, Sparkles } from "lucide-react";
import TaskLegend from "../components/TaskLegend";
import { useTheme } from "../lib/theme";

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
  
  // Get unique categories from tasks
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
    <div className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Compact Welcome Banner */}
      <div className="flex mt-[10px] mr-[80px] justify-end">
        <div className="bg-gradient-to-r from-[#A31621] to-[#D64045] dark:from-[#FF4757] dark:to-[#FF6B6B] 
                       px-[30px] py-[15px] rounded-tl-[25px] rounded-bl-[25px] rounded-tr-[25px] 
                       flex items-center gap-2 shadow-md">
          <span className="text-lg">{getGreetingEmoji()}</span>
          <h1 className="text-white text-[20px] font-medium flex items-center gap-2">
            Welcome back, {username}! 
            <Sparkles size={16} className="text-yellow-300" />
          </h1>
        </div>
      </div>
      
      <TaskLegend />

      <div className="ml-[40px] flex justify-between items-center pr-10 mt-4">
        <button 
          className="h-12 w-52 flex justify-center items-center gap-3 cursor-pointer rounded-lg transition-all transform hover:scale-105 active:scale-95 group ml-[10px]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus
            size={18}
            className="stroke-[#053C5E]/70 group-hover:stroke-[#3A3960] group-active:stroke-[#3A3960] transition-all duration-300 dark:stroke-white"
          />
          <h4 className="text-[#053C5E]/70 group-hover:text-[#3A3960] group-active:text-[#3A3960] font-semibold text-lg transition-all duration-300 dark:text-white">
            Add New Task
          </h4>
        </button>
        
        <div className="dropdown-container relative">
        <button 
          className="h-10 px-5 bg-white hover:bg-[#A9BFA8]/30 text-[#053C5E]/70 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-2 mr-[40px] border border-[#A9BFA8] dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 max-w-xs"
          onClick={toggleDropdown}
        >
          <Filter size={16} className="dark:text-gray-300 flex-shrink-0" />
          <span className="truncate">Category: {selectedCategory}</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} dark:text-gray-300 flex-shrink-0`} />
        </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white rounded-lg shadow-lg border border-[#A9BFA8] z-50 dark:bg-gray-800 dark:border-gray-600">
              <ul className="py-2">
                {uniqueCategories.map((category, index) => (
                  <li 
                    key={index}
                    className={`px-4 py-2 hover:bg-[#FAFFC5] cursor-pointer transition-colors duration-200 dark:hover:bg-gray-700 ${
                      selectedCategory === category 
                        ? 'bg-[#A9BFA8]/20 text-[#3A3960] font-medium dark:bg-gray-600 dark:text-white' 
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

      <Tabs
        tasks={filteredTasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={archiveTask}
        editTask={editTask}
        setEditingTask={setEditingTask}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
      />

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