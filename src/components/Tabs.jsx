import React from "react";
import Card from "./Card";
import { ListChecks, Hourglass, CheckCircle, Star } from "lucide-react";

const Tabs = ({ tasks = [], updateTaskStatus, deleteTask, setEditingTask = () => {}, setIsModalOpen = () => {} }) => {
  const tabs = [
    { name: "All Tasks", icon: <ListChecks size={18} />, filter: "all", badgeColor: "bg-gray-400" },
    { name: "Pending", icon: <Hourglass size={18} />, filter: "pending", badgeColor: "bg-yellow-400" },
    { name: "Completed", icon: <CheckCircle size={18} />, filter: "completed", badgeColor: "bg-green-400" },
    { name: "Favorites", icon: <Star size={18} />, filter: "favorites", badgeColor: "bg-cyan-400" },
  ];

  console.log("Current tasks:", tasks);

  return (
    <div className="flex gap-5 justify-center mt-5">
      {tabs.map((tab, index) => {
        const filteredTasks =
          tab.filter === "all"
            ? tasks
            : tab.filter === "favorites"
            ? tasks.filter((task) => task.is_favorite)
            : tasks.filter((task) => task.status === tab.filter);

        return (
          <div
            key={index}
            className="border border-[#DDD9D9] min-h-[70vh] w-[22%] flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Tab Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#F9F9F9] rounded-t-lg">
              <div className="flex gap-3 items-center">
                <span className="text-[#FF1654]">{tab.icon}</span>
                <span className="font-semibold text-lg text-[#3E3F5B]">{tab.name}</span>
              </div>
              <span
                className={`flex justify-center items-center text-white w-8 h-8 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-md transition-all duration-300 transform hover:scale-110`}
              >
                {filteredTasks.length}
              </span>
            </div>

            {/* Task Cards */}
            <div className="mt-6 px-6 pb-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((taskData) => (
                  <Card
                    key={taskData.id}
                    task={taskData}
                    updateTaskStatus={updateTaskStatus}
                    deleteTask={deleteTask}
                    setEditingTask={setEditingTask}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center mt-4">No tasks here.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
