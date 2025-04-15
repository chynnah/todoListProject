import React from "react";

const TaskLegend = () => {
  const legendItems = [
    {
      color: "bg-green-500",
      text: "Completed",
      border: "border-green-500"
    },
    {
      color: "bg-blue-500",
      text: "Pending",
      border: "border-blue-500"
    },
    {
      color: "bg-orange-500",
      text: "Due Soon (<3h)",
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
    <div className="bg-white dark:bg-gray-900  dark:border-gray-700 ">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {/* Status Legend Only */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Task Status:
          </span>
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskLegend;