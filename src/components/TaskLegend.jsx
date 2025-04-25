import React, { useState } from "react";

const TaskLegend = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const legendItems = [
    {
      color: "bg-green-500",
      text: "Done",
      border: "border-green-500",
      icon: "✓",
      description: "Completed tasks"
    },
    {
      color: "bg-blue-500",
      text: "Pending",
      border: "border-blue-500",
      icon: "⏳",
      description: "Tasks in progress"
    },
    {
      color: "bg-orange-500",
      text: "Due Soon",
      border: "border-orange-500",
      icon: "⚠️",
      description: "Tasks due within 48 hours"
    },
    {
      color: "bg-rose-500",
      text: "Overdue",
      border: "border-rose-500",
      icon: "⏰",
      description: "Tasks past their deadline"
    },
    {
      color: "bg-yellow-400",
      text: "Favorite",
      border: "border-yellow-400",
      icon: "★",
      description: "Your important tasks"
    }
  ];

  return (
    <div className="px-2 py-2 md:px-4 md:py-3 rounded-lg ">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6 relative">
        {legendItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-1.5 cursor-pointer transition-all duration-300 px-2 py-1 rounded-md 
                      ${hoveredItem === index ? `${item.border} bg-opacity-10 dark:bg-opacity-20 scale-110` : 'scale-100'}`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`relative group flex items-center gap-1`}>
              <span className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${item.color} transform transition-all duration-300 
                              ${hoveredItem === index ? 'scale-125 animate-pulse' : ''}`}></span>
              <span className={`text-xs md:text-sm font-medium transition-all duration-300 
                              ${hoveredItem === index ? `text-${item.color.split('-')[1]}-600 dark:text-${item.color.split('-')[1]}-400` : 'text-gray-600 dark:text-gray-300'}`}>
                {item.text}
              </span>
              {hoveredItem === index && (
                <span className="text-xs md:text-sm ml-0.5">{item.icon}</span>
              )}
              
              {/* Tooltip - Fixed for both light and dark modes */}
              {hoveredItem === index && (
                <div className="absolute -bottom-8 left-0 opacity-0 md:opacity-100 bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-100 text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md">
                  {item.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskLegend;