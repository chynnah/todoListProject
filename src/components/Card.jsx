import React from "react";
import { StarIcon, CheckCircleIcon, PencilIcon, ClockIcon, AlertCircleIcon } from "lucide-react";
import { Calendar, Archive, Clock } from "lucide-react";

const Card = ({ task, updateTaskStatus, deleteTask, setEditingTask, setIsModalOpen, searchQuery }) => {
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
    if (diffHours < 3) return "verySoon"; // Within 3 hours
    if (diffHours < 24) return "approaching"; // Within 24 hours
    return "normal";
  };
  
  const deadlineStatus = getDeadlineStatus();
  
  const getRelativeTime = (dateString) => {
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

  const getTimeUntilDeadline = () => {
    if (!task.deadline) return "";
    
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diffTime = deadline - now;
    
    // If deadline has passed
    if (diffTime < 0) {
      const overdueDiffTime = Math.abs(diffTime);
      const overdueDays = Math.floor(overdueDiffTime / (1000 * 60 * 60 * 24));
      const overdueHours = Math.floor((overdueDiffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const overdueMinutes = Math.floor((overdueDiffTime % (1000 * 60 * 60)) / (1000 * 60));
      
      if (overdueDays > 0) {
        return `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
      } else if (overdueHours > 0) {
        return `Overdue by ${overdueHours} hour${overdueHours > 1 ? 's' : ''}`;
      } else {
        return `Overdue by ${overdueMinutes} min${overdueMinutes > 1 ? 's' : ''}`;
      }
    }
    
    // If deadline is approaching
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `Due in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `Due in ${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };
  
  const getDeadlineStyles = () => {
    if (task.status === "completed") {
      return {
        cardBorder: "border-gray-200 dark:border-gray-700",
        bgColor: "",
        cardGlow: "",
        deadlineText: "text-gray-500 dark:text-gray-400",
        deadlineIcon: "text-gray-400 dark:text-gray-500",
        badgeColors: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
        pulseAnimation: ""
      };
    }
    
    switch (deadlineStatus) {
      case "overdue":
        return {
          cardBorder: "border-rose-200 dark:border-rose-800",
          bgColor: "bg-gradient-to-b from-rose-50/80 to-white dark:from-rose-900/10 dark:to-gray-800",
          cardGlow: "shadow-md shadow-rose-100 dark:shadow-rose-900/20",
          deadlineText: "text-rose-700 dark:text-rose-300",
          deadlineIcon: "text-rose-500 dark:text-rose-400",
          badgeColors: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
          pulseAnimation: "animate-pulse"
        };
      case "verySoon":
        return {
          cardBorder: "border-orange-200 dark:border-orange-800",
          bgColor: "bg-gradient-to-b from-orange-50/80 to-white dark:from-orange-900/10 dark:to-gray-800",
          cardGlow: "shadow-md shadow-orange-100 dark:shadow-orange-900/20",
          deadlineText: "text-orange-700 dark:text-orange-300 font-medium",
          deadlineIcon: "text-orange-500 dark:text-orange-400",
          badgeColors: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
          pulseAnimation: "animate-pulse"
        };
      case "approaching":
        return {
          cardBorder: "border-amber-200 dark:border-amber-800",
          bgColor: "bg-gradient-to-b from-amber-50/80 to-white dark:from-amber-900/10 dark:to-gray-800",
          cardGlow: "shadow-md shadow-amber-100 dark:shadow-amber-900/20",
          deadlineText: "text-amber-700 dark:text-amber-300",
          deadlineIcon: "text-amber-500 dark:text-amber-400",
          badgeColors: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
          pulseAnimation: ""
        };
      default:
        return {
          cardBorder: "border-gray-200 dark:border-gray-700",
          bgColor: "",
          cardGlow: "",
          deadlineText: "text-gray-500 dark:text-gray-400",
          deadlineIcon: "text-gray-400 dark:text-gray-500",
          badgeColors: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
          pulseAnimation: ""
        };
    }
  };
  
  const deadlineStyles = getDeadlineStyles();
  
  return (
    <div 
      className={`relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 mb-3
        ${task.status === "completed" ? "bg-gray-50 dark:bg-gray-800/50" : deadlineStyles.bgColor || "bg-white dark:bg-gray-800"}
        ${searchQuery && (task.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()))) 
          ? 'ring-2 ring-yellow-300 dark:ring-yellow-500' : 'ring-0'}
        ${deadlineStyles.cardBorder}
        ${deadlineStyles.cardGlow}
        ${task.is_favorite ? 'border-l-4 border-l-yellow-400 dark:border-l-yellow-500' : ''}
      `}
    >
      {/* Deadline indicator - subtle right border gradient */}
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
              : `Created: ${getRelativeTime(task.created_at || Date.now())}`}
          </p>
          
          {task.deadline && (
            <div className={`flex items-center gap-2 ${deadlineStyles.pulseAnimation}`}>
              <div className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 
                ${task.status === "completed" ? "bg-gray-100 dark:bg-gray-800" : 
                deadlineStatus === "overdue" ? "bg-rose-100/70 dark:bg-rose-900/20" :
                deadlineStatus === "verySoon" ? "bg-orange-100/70 dark:bg-orange-900/20" :
                deadlineStatus === "approaching" ? "bg-amber-100/70 dark:bg-amber-900/20" : 
                "bg-gray-100 dark:bg-gray-800"}`}
              >
                {deadlineStatus === "overdue" && task.status !== "completed" ? (
                  <ClockIcon size={12} className={deadlineStyles.deadlineIcon} />
                ) : deadlineStatus === "verySoon" && task.status !== "completed" ? (
                  <AlertCircleIcon size={12} className={deadlineStyles.deadlineIcon} />
                ) : (
                  <Calendar size={12} className={deadlineStyles.deadlineIcon} />
                )}
                <span className={deadlineStyles.deadlineText}>
                  {getTimeUntilDeadline()}
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
          className={`text-xs flex items-center gap-1.5 font-medium py-1.5 px-3 rounded-md transition-colors ${
            task.status === "completed"
              ? "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              : deadlineStatus === "overdue"
                ? "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                : deadlineStatus === "verySoon"
                ? "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                : "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
          onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
        >
          <CheckCircleIcon size={14} />
          {task.status === "completed" ? "Mark pending" : "Complete"}
        </button>
        
        <div className="flex items-center gap-2">
          <button
            className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => updateTaskStatus(task.id, null, task.is_favorite ? 0 : 1)}
            title={task.is_favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <StarIcon size={16} className={task.is_favorite ? "fill-yellow-400" : ""} />
          </button>
          
          <button
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            title="Edit task"
          >
            <PencilIcon size={16} />
          </button>
          
          <button
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              if (window.confirm("Archive this task?")) {
                deleteTask(task.id);
              }
            }}
            title="Archive task"
          >
            <Archive size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;