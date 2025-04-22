import React from "react";

const TaskLegend = () => {
  const legendItems = [
    {
      color: "bg-green-500",
      text: "Done",
      border: "border-green-500"
    },
    {
      color: "bg-blue-500",
      text: "Pending",
      border: "border-blue-500"
    },
    {
      color: "bg-orange-500",
      text: "Due Soon",
      border: "border-orange-500"
    },
    {
      color: "bg-rose-500",
      text: "Overdue",
      border: "border-rose-500"
    },
    {
      color: "bg-yellow-400",
      text: "Favorite",
      border: "border-yellow-400"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 dark:border-gray-700 px-2 py-1 md:px-4 md:py-2">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6">
        {/* Mobile/Tablet Legend - Compact and Responsive */}
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 lg:gap-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${item.color}`}></span>
                <span className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskLegend;