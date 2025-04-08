import React from "react";
import Card from "./Card";
import { ListChecks, Hourglass, CheckCircle, Star } from "lucide-react";

const Tabs = ({ tasks = [], updateTaskStatus, deleteTask, setEditingTask = () => {}, setIsModalOpen = () => {} }) => {
  const tabs = [
    { name: "All Tasks", icon: <ListChecks size={15} />, filter: "all", badgeColor: "bg-gray-400" },
    { name: "Pending", icon: <Hourglass size={15} />, filter: "pending", badgeColor: "bg-yellow-400" },
    { name: "Completed", icon: <CheckCircle size={15} />, filter: "completed", badgeColor: "bg-green-400" },
    { name: "Favorites", icon: <Star size={15} />, filter: "favorites", badgeColor: "bg-cyan-400" },
  ];
  

  console.log("Current tasks:", tasks); 

  return (
    <div className="flex gap-2 m-auto justify-center mt-5 gap-3 bg-[#FDFDFD]">
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
            className="border border-[#DDD9D9] min-h-[70vh] w-[23%] flex flex-col pt-5 rounded-tl-[50px] rounded-tr-[8px] rounded-b-[8px] text-[#3E3F5B]"
          >

            {/* Tab Header */}
            <div className="flex justify-between items-center px-5 py-3 ">
              <div className="flex gap-2 items-center">
                <span className="text-[#3E3F5B]">{tab.icon}</span>
                <span className="font-medium text-sm text-[#3E3F5B]">{tab.name}</span>
              </div>
              <span
                className={`flex justify-center items-center text-white w-6 h-6 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-sm transition-all duration-300 transform hover:scale-110`}
              >
                {filteredTasks.length}
              </span>
            </div>

            {/* Task Cards */}
            <div className="mt-4 px-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((taskData, i) => (
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
