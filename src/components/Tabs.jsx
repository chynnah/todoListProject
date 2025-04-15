import Card from "./Card";
import { ListChecks, Hourglass, CheckCircle, Star } from "lucide-react";

const Tabs = ({ 
  tasks = [], 
  updateTaskStatus, 
  deleteTask, 
  setEditingTask = () => {}, 
  setIsModalOpen = () => {},
  searchQuery = '' 
}) => {
  const tabs = [
    { name: "All Tasks", icon: <ListChecks size={18} />, filter: "all", badgeColor: "bg-gray-400 dark:bg-gray-600" },
    { name: "Pending", icon: <Hourglass size={18} />, filter: "pending", badgeColor: "bg-yellow-400 dark:bg-yellow-600" },
    { name: "Completed", icon: <CheckCircle size={18} />, filter: "completed", badgeColor: "bg-green-400 dark:bg-green-600" },
    { name: "Favorites", icon: <Star size={18} />, filter: "favorites", badgeColor: "bg-cyan-400 dark:bg-cyan-600" },
  ];

  const filterTasks = (tasksToFilter, filterType) => {
    let filtered = tasksToFilter;
    
    if (filterType === "favorites") {
      filtered = filtered.filter((task) => task.is_favorite);
    } else if (filterType !== "all") {
      filtered = filtered.filter((task) => task.status === filterType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.task.toLowerCase().includes(query) || 
        (task.category && task.category.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  return (
    <div className="flex gap-5 justify-center mt-5">
      {tabs.map((tab, index) => {
        const filteredTasks = filterTasks(tasks, tab.filter);

        return (
          <div
            key={index}
            className="border border-[#DDD9D9] dark:border-gray-700 min-h-[70vh] w-[22%] flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
          >
            {/* Tab Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 text-[#053C5E] dark:text-gray-200 font-sans transition-colors duration-200 rounded-t-lg border-b border-[#DDD9D9] dark:border-gray-700">
              <div className="flex gap-3 items-center">
                <span className="text-[#FF1654] dark:text-[#FF6B8B]">{tab.icon}</span>
                <span className="font-semibold text-lg text-[#3E3F5B] dark:text-gray-200">{tab.name}</span>
              </div>
              <span
                className={`flex justify-center items-center text-white w-8 h-8 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-md transition-all duration-300 transform hover:scale-110`}
              >
                {filteredTasks.length}
              </span>
            </div>

            {/* Task Cards */}
            <div className="mt-6 px-6 pb-6 overflow-y-auto flex-1">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((taskData) => (
                  <Card
                    key={taskData.id}
                    task={taskData}
                    updateTaskStatus={updateTaskStatus}
                    deleteTask={deleteTask}
                    setEditingTask={setEditingTask}
                    setIsModalOpen={setIsModalOpen}
                    searchQuery={searchQuery}
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
                  {searchQuery ? "No matching tasks found" : "No tasks here"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;