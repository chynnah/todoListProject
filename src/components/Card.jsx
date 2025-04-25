import React from "react";
import { Star, CheckCircle, Pencil, Clock, AlertCircle, Calendar, Archive } from "lucide-react";

const Card = ({ task, updateTaskStatus, deleteTask, setEditingTask, setIsModalOpen, searchQuery, onDragStart }) => {
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
  
  const categoryName = task.category && task.category !== "null" ? task.category : "Uncategorized";
  const categoryEmoji = categoryEmojis[categoryName] || "📌";
  
  const highlightText = (text) => {
    if (!searchQuery || !text) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-100 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200 rounded px-1">{part}</mark>
      ) : (
        part
      )
    );
  };

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
  
  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const getTimeUntilDeadline = () => {
    if (!task.deadline) return "";
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diffTime = deadline - now;
    
    if (diffTime < 0) {
      const overdueDiffTime = Math.abs(diffTime);
      const overdueDays = Math.floor(overdueDiffTime / (1000 * 60 * 60 * 24));
      const overdueHours = Math.floor((overdueDiffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (overdueDays > 0) return `Overdue ${overdueDays}d`;
      if (overdueHours > 0) return `Overdue ${overdueHours}h`;
      return `Overdue`;
    }
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `Due in ${days}d`;
    if (hours > 0) return `Due in ${hours}h`;
    return `Due soon`;
  };
  
  const getDeadlineStyles = () => {
    if (task.status === "completed") {
      return {
        deadlineText: "text-gray-500 dark:text-gray-400",
        deadlineIcon: "text-gray-400 dark:text-gray-500",
        badgeColors: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      };
    }
    
    switch (deadlineStatus) {
      case "overdue":
        return {
          deadlineText: "text-rose-700 dark:text-rose-300",
          deadlineIcon: "text-rose-500 dark:text-rose-400",
          badgeColors: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
        };
      case "verySoon":
        return {
          deadlineText: "text-orange-700 dark:text-orange-300",
          deadlineIcon: "text-orange-500 dark:text-orange-400",
          badgeColors: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
        };
      case "approaching":
        return {
          deadlineText: "text-amber-700 dark:text-amber-300",
          deadlineIcon: "text-amber-500 dark:text-amber-400",
          badgeColors: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
        };
      default:
        return {
          deadlineText: "text-gray-500 dark:text-gray-400",
          deadlineIcon: "text-gray-400 dark:text-gray-500",
          badgeColors: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
        };
    }
  };
  
  const deadlineStyles = getDeadlineStyles();

  // Drag and drop handlers
  const handleDragStart = (e) => {
    // Set the data to be transferred - the task ID
    e.dataTransfer.setData("text/plain", task.id);
    
    // Set a custom property to indicate task status
    e.dataTransfer.setData("application/taskstatus", task.status);
    
    setTimeout(() => {
      e.target.style.opacity = "0.6";
    }, 0);
    
    // Call the parent's onDragStart if provided
    if (onDragStart) {
      onDragStart(task);
    }
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    e.target.style.transform = "none";
  };
  
  return (
    <div 
      className={`relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 mb-2 md:mb-3 w-full max-w-full overflow-hidden cursor-grab active:cursor-grabbing
        ${task.status === "completed" ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}
        ${searchQuery && (task.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()))) 
          ? 'ring-1 md:ring-2 ring-yellow-300 dark:ring-yellow-500' : 'ring-0'}
        ${task.is_favorite ? 'border-l-2 md:border-l-4 border-l-yellow-400 dark:border-l-yellow-500' : ''}
        border-gray-200 dark:border-gray-700`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center px-3 py-1.5 md:px-3 md:py-2 border-b border-gray-100 dark:border-gray-700 w-full overflow-hidden">
        <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
          <span className="text-sm md:text-sm flex-shrink-0">{categoryEmoji}</span>
          <span className="text-sm md:text-sm font-medium text-gray-600 dark:text-gray-300 truncate min-w-0">
            {highlightText(categoryName)}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          {task.is_favorite && (
            <span className="flex items-center text-xs md:text-xs font-medium text-yellow-600 dark:text-yellow-400">
              <Star size={14} className="fill-yellow-400 dark:fill-yellow-500" />
            </span>
          )}
          
          <span className={`text-xs md:text-xs font-medium py-0.5 px-1.5 md:px-1.5 rounded-full whitespace-nowrap ${deadlineStyles.badgeColors}`}>
            {task.status === "completed" 
              ? "Done" 
              : deadlineStatus === "overdue" 
                ? "Overdue" 
                : deadlineStatus === "verySoon"
                ? "Soon"
                : "Pending"}
          </span>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-2.5 md:p-3 relative w-full">
        <h3 className={`task-title text-sm md:text-base font-medium mb-2 md:mb-2
                ${task.status === "completed" 
                  ? "line-through text-gray-400 dark:text-gray-500" 
                  : "text-gray-800 dark:text-gray-200"}`}>
                  {highlightText(task.task)}
         </h3>
        
        <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3 w-full">
          <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 w-full">
            <Clock size={12} className="md:size-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="truncate">
              {task.updated_at
                ? `Updated: ${getRelativeTime(task.updated_at)}`
                : `Created: ${getRelativeTime(task.created_at || Date.now())}`}
            </span>
          </p>
          
          {task.deadline && (
            <div className="flex flex-col gap-1 md:gap-1 w-full">
              <div className={`px-2 md:px-2 py-1 rounded-md text-xs md:text-xs font-medium flex items-center gap-1 md:gap-1 w-full
                ${task.status === "completed" ? "bg-gray-100 dark:bg-gray-800" : 
                deadlineStatus === "overdue" ? "bg-rose-100/70 dark:bg-rose-900/20" :
                deadlineStatus === "verySoon" ? "bg-orange-100/70 dark:bg-orange-900/20" :
                "bg-gray-100 dark:bg-gray-800"}`}
              >
                {deadlineStatus === "overdue" && task.status !== "completed" ? (
                  <AlertCircle size={12} className={`md:size-3 ${deadlineStyles.deadlineIcon} flex-shrink-0`} />
                ) : deadlineStatus === "verySoon" && task.status !== "completed" ? (
                  <Clock size={12} className={`md:size-3 ${deadlineStyles.deadlineIcon} flex-shrink-0`} />
                ) : (
                  <Calendar size={12} className={`md:size-3 ${deadlineStyles.deadlineIcon} flex-shrink-0`} />
                )}
                <span className={`${deadlineStyles.deadlineText} truncate`}>
                  {getTimeUntilDeadline()}
                </span>
              </div>
              <span className="text-xs md:text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                {new Date(task.deadline).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'})} {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="flex justify-between items-center bg-gray-50/80 dark:bg-gray-800/50 px-2.5 md:px-3 py-1.5 md:py-2 border-t border-gray-100 dark:border-gray-700 rounded-b-lg w-full">
        <button
          className={`text-xs md:text-xs flex items-center gap-1 md:gap-1 font-medium py-1 md:py-1 px-2 md:px-1.5 rounded-md transition-colors ${
            task.status === "completed"
              ? "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              : deadlineStatus === "overdue"
                ? "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                : "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          }`}
          onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
        >
          <CheckCircle size={12} className="md:size-3 flex-shrink-0" />
          <span className="whitespace-nowrap">
            {task.status === "completed" ? "Undo" : "Done"}
          </span>
        </button>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 p-1 rounded-md"
            onClick={() => updateTaskStatus(task.id, null, task.is_favorite ? 0 : 1)}
          >
            <Star size={14} className={`md:size-3 ${task.is_favorite ? "fill-yellow-400" : ""}`} />
          </button>
          
          <button
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 p-1 rounded-md"
            onClick={() => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
          >
            <Pencil size={14} className="md:size-3" />
          </button>
          
          <button
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-md"
            onClick={() => {
              if (window.confirm("Archive this task?")) {
                deleteTask(task.id);
              }
            }}
          >
            <Archive size={14} className="md:size-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;