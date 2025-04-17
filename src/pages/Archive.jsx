import React, { useState, useEffect } from 'react'; 
import { 
  Trash2, 
  Calendar, 
  Clock, 
  Archive as ArchiveIcon, 
  Search, 
  ChevronDown, 
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-react';

const Archive = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Category emojis
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
    Uncategorized: "📌"
  };

  // Fetch archived tasks
  const fetchArchivedTasks = () => {
    const userId = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/backend/api/tasks/get_archived_tasks.php?user_id=${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArchivedTasks(
            data.tasks.map((task) => ({
              ...task,
              is_favorite: task.is_favorite === 1,
              category: task.category || "Uncategorized", 
            }))
          );
        } else {
          console.error("Error fetching archived tasks:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching archived tasks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArchivedTasks();
  }, []);

  // Restore task
  const restoreTask = (taskId) => {
    fetch("http://localhost:3000/backend/api/tasks/restore_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ task_id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchArchivedTasks();
        } else {
          console.error("Error restoring task:", data.message);
        }
      })
      .catch((err) => console.error("Error restoring task:", err));
  };

  // Permanently delete task
  const permanentlyDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to permanently delete this task?")) {
      fetch("http://localhost:3000/backend/api/tasks/permanent_delete_task.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task_id: taskId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            fetchArchivedTasks();
          } else {
            console.error("Error deleting task:", data.message);
          }
        })
        .catch((err) => console.error("Error deleting task:", err));
    }
  };

  // Get all unique categories
  const uniqueCategories = ['All', ...new Set(archivedTasks.map(task => task.category || "Uncategorized"))];

  // Format relative time
  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Unknown time';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Highlight search text
  const highlightText = (text) => {
    if (!searchQuery || !text) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-600 rounded px-1">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // Filter tasks based on search query and category
  const filteredTasks = archivedTasks.filter(task => {
    const matchesSearch = 
      task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      (task.category === selectedCategory) || 
      (selectedCategory === 'Uncategorized' && (!task.category || task.category === 'null'));
    
    return matchesSearch && matchesCategory;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors min-h-screen p-6 ">
      {/* Search and Filter Section - Right aligned */}
      <div className="flex justify-end mb-6 ">
        <div className="flex items-center gap-4">
          {/* Updated Search Input to match Search.jsx design */}
          <div className="border border-[#DDD9D9] relative dark:bg-gray-900 dark:bg-gray-700 dark:border-gray-700 rounded-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for task..."
              className="px-3 py-1.5 md:px-4 md:py-2 w-full md:w-[250px] lg:w-[300px] rounded-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-[#FF1654] placeholder-gray-500 text-sm md:text-base dark:bg-gray-800 dark:text-white"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF1654] text-sm md:text-base">
              🔍
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="dropdown-container relative mr-[85px]">
            <button 
              className="h-10 px-5 bg-white hover:bg-[#A9BFA8]/30 text-[#053C5E]/70 font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-between gap-2 border border-[#A9BFA8] dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              <span className="truncate">Category: {selectedCategory}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} dark:text-gray-300 flex-shrink-0`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white rounded-lg shadow-lg border border-[#A9BFA8] z-50 dark:bg-gray-800 dark:border-gray-600">
                <ul className="py-2 max-h-60 overflow-y-auto">
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
      </div>

      {/* Content Section */}
      <div className='mx-[60px]'>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-[#A9BFA8]/30 dark:bg-gray-700"></div>
              <p className="text-lg text-[#053C5E]/70 dark:text-gray-400">Loading archived tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16 rounded-xl shadow-sm bg-white dark:bg-gray-800 border border-[#A9BFA8] dark:border-gray-600">
            <div className="mb-4 text-[#A9BFA8] dark:text-gray-600">
              <ArchiveIcon size={72} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-[#053C5E] dark:text-gray-200">Archive is empty</h3>
            <p className="mb-6 text-[#053C5E]/70 dark:text-gray-400">No tasks match your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6">
            {filteredTasks.map((task) => {
              const categoryName = task.category && task.category !== "null" ? task.category : "Uncategorized";
              const categoryEmoji = categoryEmojis[categoryName] || "📌";
              
              const getDeadlineStatus = () => {
                if (!task.deadline) return "none";
                const deadline = new Date(task.deadline);
                const now = new Date();
                const diffTime = deadline - now;
                const diffHours = diffTime / (1000 * 60 * 60);
                if (diffTime < 0) return "overdue";
                if (diffHours < 3) return "verySoon";
                if (diffHours < 24) return "approaching";
                return "normal";
              };
              
              const deadlineStatus = getDeadlineStatus();
              
              const getDeadlineStyles = () => {
                if (task.status === "completed") {
                  return {
                    cardBorder: "border-gray-200 dark:border-gray-700",
                    deadlineText: "text-gray-500 dark:text-gray-400",
                    deadlineIcon: "text-gray-400 dark:text-gray-500",
                    badgeColors: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  };
                }
                
                switch (deadlineStatus) {
                  case "overdue":
                    return {
                      cardBorder: "border-rose-200 dark:border-rose-800",
                      deadlineText: "text-rose-700 dark:text-rose-300",
                      deadlineIcon: "text-rose-500 dark:text-rose-400",
                      badgeColors: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                    };
                  case "verySoon":
                    return {
                      cardBorder: "border-orange-200 dark:border-orange-800",
                      deadlineText: "text-orange-700 dark:text-orange-300",
                      deadlineIcon: "text-orange-500 dark:text-orange-400",
                      badgeColors: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                    };
                  case "approaching":
                    return {
                      cardBorder: "border-amber-200 dark:border-amber-800",
                      deadlineText: "text-amber-700 dark:text-amber-300",
                      deadlineIcon: "text-amber-500 dark:text-amber-400",
                      badgeColors: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                    };
                  default:
                    return {
                      cardBorder: "border-gray-200 dark:border-gray-700",
                      deadlineText: "text-gray-500 dark:text-gray-400",
                      deadlineIcon: "text-gray-400 dark:text-gray-500",
                      badgeColors: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    };
                }
              };
              
              const deadlineStyles = getDeadlineStyles();
              
              return (
                <div 
                  key={task.id} 
                  className={`relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 mb-3
                    ${task.status === "completed" ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}
                    ${deadlineStyles.cardBorder}
                    ${task.is_favorite ? 'border-l-4 border-l-yellow-400 dark:border-l-yellow-500' : ''}
                  `}
                >
                  {/* Deadline indicator */}
                  {deadlineStatus !== "none" && deadlineStatus !== "normal" && task.status !== "completed" && (
                    <div className={`absolute inset-y-0 right-0 w-1 rounded-r-lg ${
                      deadlineStatus === "overdue" 
                        ? "bg-gradient-to-b from-rose-300 to-rose-500 dark:from-rose-600 dark:to-rose-800" 
                        : deadlineStatus === "verySoon"
                        ? "bg-gradient-to-b from-orange-300 to-orange-500 dark:from-orange-500 dark:to-orange-700"
                        : "bg-gradient-to-b from-amber-300 to-amber-500 dark:from-amber-500 dark:to-amber-700"
                    }`}></div>
                  )}
                  
                  {/* Header with category and status */}
                  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{categoryEmoji}</span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {highlightText(categoryName)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {task.is_favorite && (
                        <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                          <StarIcon size={14} className="fill-yellow-400 dark:fill-yellow-500" />
                          Favorite
                        </span>
                      )}
                      
                      <span className={`text-xs font-medium py-1 px-2.5 rounded-full ${deadlineStyles.badgeColors}`}>
                        {task.status === "completed" 
                          ? "Completed" 
                          : deadlineStatus === "overdue" 
                            ? "Overdue" 
                            : deadlineStatus === "verySoon"
                            ? "Due Soon"
                            : "Pending"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="p-4">
                    {/* Task title */}
                    <h3
                      className={`text-base font-medium mb-2 ${
                        task.status === "completed" 
                          ? "line-through text-gray-400 dark:text-gray-500" 
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {highlightText(task.task)}
                    </h3>
                    
                    {/* Metadata */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Clock size={12} className="text-gray-400 dark:text-gray-500" />
                        {task.updated_at
                          ? `Updated: ${getRelativeTime(task.updated_at)}`
                          : `Created: ${getRelativeTime(task.created_at)}`}
                      </p>
                      
                      {task.deadline && (
                        <div className="flex items-center gap-2">
                          <div className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 
                            ${task.status === "completed" ? "bg-gray-100 dark:bg-gray-800" : 
                            deadlineStatus === "overdue" ? "bg-rose-100/70 dark:bg-rose-900/20" :
                            deadlineStatus === "verySoon" ? "bg-orange-100/70 dark:bg-orange-900/20" :
                            deadlineStatus === "approaching" ? "bg-amber-100/70 dark:bg-amber-900/20" : 
                            "bg-gray-100 dark:bg-gray-800"}`}
                          >
                            {deadlineStatus === "overdue" && task.status !== "completed" ? (
                              <Clock size={12} className={deadlineStyles.deadlineIcon} />
                            ) : deadlineStatus === "verySoon" && task.status !== "completed" ? (
                              <AlertCircleIcon size={12} className={deadlineStyles.deadlineIcon} />
                            ) : (
                              <Calendar size={12} className={deadlineStyles.deadlineIcon} />
                            )}
                            <span className={deadlineStyles.deadlineText}>
                              {getRelativeTime(task.deadline)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(task.deadline).toLocaleDateString()} {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between items-center bg-gray-50/80 dark:bg-gray-800/50 px-4 py-3 border-t border-gray-100 dark:border-gray-700 rounded-b-lg">
                    <button
                      className="text-xs flex items-center gap-1.5 font-medium py-1.5 px-3 rounded-md transition-colors text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => restoreTask(task.id)}
                    >
                      <CheckCircleIcon size={14} />
                      Restore
                    </button>
                    
                    <button
                      className="text-xs flex items-center gap-1.5 font-medium py-1.5 px-3 rounded-md transition-colors text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      onClick={() => permanentlyDeleteTask(task.id)}
                    >
                      <Trash2 size={14} />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;