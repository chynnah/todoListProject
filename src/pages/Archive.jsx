import React, { useState, useEffect } from 'react'; 
import { 
  Trash2, 
  Calendar, 
  Clock, 
  Archive as ArchiveIcon, 
  ChevronDown, 
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-react';
import Pagination from '../components/Pagination'; 

const Archive = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; 

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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, selectedCategory]);

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

  const uniqueCategories = ['All', ...new Set(archivedTasks.map(task => task.category || "Uncategorized"))];

  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Unknown time';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const highlightText = (text) => {
    if (!searchQuery || !text) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-100 dark:bg-yellow-800/50 rounded px-0.5">{part}</mark>
      ) : (
        part
      )
    );
  };

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

  // Calculate pagination values
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (isDropdownOpen && e.target.closest('.dropdown-container') === null) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [isDropdownOpen]);

  const getDeadlineStatus = (task) => {
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

  const getDeadlineStyles = (task) => {
    if (task.status === "completed") {
      return {
        deadlineText: "text-gray-500 dark:text-gray-400",
        deadlineIcon: "text-gray-400 dark:text-gray-500",
        badgeColors: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      };
    }
    
    const deadlineStatus = getDeadlineStatus(task);
    switch (deadlineStatus) {
      case "overdue":
        return {
          deadlineText: "text-rose-700 dark:text-rose-300",
          deadlineIcon: "text-rose-500 dark:text-rose-400",
          badgeColors: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
        };
      case "verySoon":
        return {
          deadlineText: "text-orange-700 dark:text-orange-300",
          deadlineIcon: "text-orange-500 dark:text-orange-400",
          badgeColors: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
        };
      case "approaching":
        return {
          deadlineText: "text-amber-700 dark:text-amber-300",
          deadlineIcon: "text-amber-500 dark:text-amber-400",
          badgeColors: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
        };
      default:
        return {
          deadlineText: "text-gray-500 dark:text-gray-400",
          deadlineIcon: "text-gray-400 dark:text-gray-500",
          badgeColors: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
        };
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 min-h-screen p-3 md:p-4">
      {/* Search and Filter Section */}
      <div className="flex flex-row justify-end gap-1 ml-2 md:gap-2 mb-3 md:mb-4">
        <div className="border border-[#DDD9D9] dark:border-gray-700 rounded-lg relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-2 md:px-3 py-1 md:py-1.5 w-[100px] md:w-[140px] text-xs md:text-sm bg-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF1654] placeholder-gray-500 dark:placeholder-gray-400"
          />
          <span className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 text-[#FF1654] text-xs md:text-base">🔍</span>
        </div>

        <div className="dropdown-container relative w-auto ml-auto mr-2">
          <button
            onClick={toggleDropdown}
            className="h-7 md:h-9 px-2 md:px-3 bg-white dark:bg-gray-800 border border-[#A9BFA8] dark:border-gray-700 rounded-lg flex items-center justify-between gap-1 md:gap-2 w-full"
          >
            <span className="text-xs md:text-sm truncate max-w-24 md:max-w-full">Category: {selectedCategory}</span>
            <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''} md:size-4`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[#A9BFA8] dark:border-gray-700 z-50">
              <ul className="py-1 overflow-y-auto">
                {uniqueCategories.map((category) => (
                  <li
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm cursor-pointer hover:bg-[#FAFFC5] dark:hover:bg-gray-700 ${
                      selectedCategory === category ? 'bg-[#A9BFA8]/20 dark:bg-gray-700' : ''
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-1 sm:mx-2">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-gray-200 dark:bg-gray-700"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading archived tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center p-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-[#A9BFA8] dark:border-gray-700">
            <ArchiveIcon size={48} className="text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Archive is empty</h3>
            <p className="text-gray-500 dark:text-gray-400">No tasks match your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
              {paginatedTasks.map((task) => {
                const categoryName = task.category || "Uncategorized";
                const categoryEmoji = categoryEmojis[categoryName] || "📌";
                const deadlineStyles = getDeadlineStyles(task);

                return (
                  <div
                    key={task.id}
                    className={`relative rounded-lg border shadow-sm hover:shadow-md transition-all
                      ${task.status === "completed" ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
                      ${searchQuery ? 'ring-1 ring-yellow-300 dark:ring-yellow-500' : 'ring-0'}
                      ${task.is_favorite ? 'border-l-4 border-l-yellow-400 dark:border-l-yellow-500' : ''}
                      border-gray-200 dark:border-gray-700`}
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm">{categoryEmoji}</span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate">
                          {highlightText(categoryName)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {task.is_favorite && (
                          <StarIcon size={14} className="fill-yellow-400 dark:fill-yellow-500 text-yellow-600" />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${deadlineStyles.badgeColors}`}>
                          {task.status === "completed" ? 'Done' : 
                          getDeadlineStatus(task) === 'overdue' ? 'Overdue' :
                          getDeadlineStatus(task) === 'verySoon' ? 'Soon' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3">
                      <h3 className={`text-sm font-medium mb-2 ${
                        task.status === "completed" ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {highlightText(task.task)}
                      </h3>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock size={12} />
                          {task.updated_at ? `Updated: ${getRelativeTime(task.updated_at)}` : `Created: ${getRelativeTime(task.created_at)}`}
                        </p>
                        
                        {task.deadline && (
                          <div className="flex flex-col gap-1">
                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${deadlineStyles.badgeColors}`}>
                              <Calendar size={12} className={deadlineStyles.deadlineIcon} />
                              <span className={deadlineStyles.deadlineText}>
                                {getRelativeTime(task.deadline)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(task.deadline).toLocaleDateString()} {' '}
                              {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex justify-between items-center px-3 py-2 bg-gray-50/80 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => restoreTask(task.id)}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded-md"
                      >
                        <CheckCircleIcon size={14} />
                        Restore
                      </button>
                      <button
                        onClick={() => permanentlyDeleteTask(task.id)}
                        className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-2 py-1 rounded-md"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Add Pagination Component */}
            {filteredTasks.length > 0 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Archive;