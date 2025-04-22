import { ListChecks, Hourglass, CheckCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Card from "./Card";

const Tabs = ({ 
  tasks = [], 
  updateTaskStatus, 
  deleteTask, 
  setEditingTask = () => {}, 
  setIsModalOpen = () => {},
  searchQuery = '' 
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); 

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTabIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        setItemsPerPage(3); 
      } else if (window.innerWidth < 1024) { // Tablet
        setItemsPerPage(4); 
      } else { // Desktop
        setItemsPerPage(4); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const tabs = [
    { name: "All", icon: <ListChecks size={16} />, filter: "all", badgeColor: "bg-gray-400 dark:bg-gray-600" },
    { name: "Pending", icon: <Hourglass size={16} />, filter: "pending", badgeColor: "bg-blue-500 dark:bg-blue-600" },
    { name: "Done", icon: <CheckCircle size={16} />, filter: "completed", badgeColor: "bg-green-500 dark:bg-green-600" },
    { name: "Favs", icon: <Star size={16} />, filter: "favorites", badgeColor: "bg-yellow-400 dark:bg-yellow-500" },
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

  const getPaginatedTasks = (filteredTasks) => {
    const startIndex = currentPage * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderMobileView = () => {
    const activeTab = tabs[activeTabIndex];
    const filteredTasks = filterTasks(tasks, activeTab.filter);
    const paginatedTasks = getPaginatedTasks(filteredTasks);
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    return (
      <div className="flex flex-col md:hidden w-full">
        <div className="flex overflow-x-auto pb-1 mb-1 gap-1 scrollbar-hide px-0.5">
          {tabs.map((tab, index) => {
            const tabTasks = filterTasks(tasks, tab.filter);
            
            return (
              <button
                key={index}
                className={`flex items-center gap-1 whitespace-nowrap px-2 py-1 rounded-lg border transition-all flex-shrink-0 ${
                  activeTabIndex === index
                    ? "bg-white dark:bg-gray-800 border-[#A9BFA8] dark:border-gray-600 shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setActiveTabIndex(index)}
              >
                <span className={`text-[#FF1654] dark:text-[#FF6B8B]`}>{tab.icon}</span>
                <span className={`text-[10px] font-medium ${
                  activeTabIndex === index 
                    ? "text-[#3E3F5B] dark:text-gray-200" 
                    : "text-gray-600 dark:text-gray-400"
                }`}>
                  {tab.name}
                </span>
                <span
                  className={`flex justify-center items-center text-white w-4 h-4 rounded-full text-[8px] font-semibold ${tab.badgeColor} shadow-sm`}
                >
                  {tabTasks.length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#DDD9D9] dark:border-gray-700 rounded-lg shadow-md mx-0.5">
          <div className="flex justify-between items-center px-2 py-1.5 border-b border-[#DDD9D9] dark:border-gray-700">
            <div className="flex gap-1 items-center">
              <span className="text-[#FF1654] dark:text-[#FF6B8B]">{activeTab.icon}</span>
              <span className="font-semibold text-xs text-[#3E3F5B] dark:text-gray-200">{activeTab.name}</span>
            </div>
            <span
              className={`flex justify-center items-center text-white w-4 h-4 rounded-full text-[10px] font-semibold ${activeTab.badgeColor}`}
            >
              {filteredTasks.length}
            </span>
          </div>
          
          <div className="p-1">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((taskData) => (
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
              <p className="text-gray-500 dark:text-gray-400 text-center py-3 text-xs">
                {searchQuery ? "No matching tasks found" : "No tasks here"}
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    );
  };

  const renderMediumScreenView = () => {
    const activeTab = tabs[activeTabIndex];
    const filteredTasks = filterTasks(tasks, activeTab.filter);
    const paginatedTasks = getPaginatedTasks(filteredTasks);
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    return (
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-4 gap-2 max-w-full">
          {tabs.map((tab, index) => {
            const tabTasks = filterTasks(tasks, tab.filter);
            
            return (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`border cursor-pointer transition-all duration-200 
                  ${activeTabIndex === index 
                    ? "border-[#A9BFA8] dark:border-gray-500 shadow-md" 
                    : "border-[#DDD9D9] dark:border-gray-700"} 
                  rounded-lg bg-white dark:bg-gray-800`}
              >
                <div className="flex justify-between items-center px-2 py-2 bg-white dark:bg-gray-800 text-[#053C5E] dark:text-gray-200 rounded-t-lg border-b border-[#DDD9D9] dark:border-gray-700">
                  <div className="flex gap-1 items-center">
                    <span className={`${activeTabIndex === index ? "text-[#FF1654]" : "text-gray-500"} dark:text-[#FF6B8B]`}>
                      {tab.icon}
                    </span>
                    <span className={`font-medium text-xs 
                      ${activeTabIndex === index 
                        ? "text-[#3E3F5B] dark:text-gray-200" 
                        : "text-gray-600 dark:text-gray-400"} 
                      truncate`}>
                      {tab.name}
                    </span>
                  </div>
                  <span
                    className={`flex justify-center items-center text-white w-5 h-5 rounded-full text-xs font-semibold ${tab.badgeColor}`}
                  >
                    {tabTasks.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-2 border border-[#DDD9D9] dark:border-gray-700 min-h-[60vh] rounded-lg shadow-md bg-white dark:bg-gray-800">
          <div className="px-3 py-2 border-b border-[#DDD9D9] dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#FF1654] dark:text-[#FF6B8B]">{activeTab.icon}</span>
              <h3 className="font-semibold text-sm text-[#3E3F5B] dark:text-gray-200">
                {activeTab.name} Tasks
              </h3>
              <span
                className={`flex justify-center items-center text-white w-5 h-5 rounded-full text-xs font-semibold ${activeTab.badgeColor}`}
              >
                {filteredTasks.length}
              </span>
            </div>
          </div>
          
          <div className="p-2 overflow-y-auto h-full">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((taskData) => (
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
              <p className="text-gray-500 dark:text-gray-400 text-center mt-4 text-sm">
                {searchQuery ? "No matching tasks found" : "No tasks here"}
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    );
  };

  const renderDesktopView = () => {
    return (
      <div className="hidden lg:grid lg:grid-cols-4 gap-3 max-w-full">
        {tabs.map((tab, index) => {
          const filteredTasks = filterTasks(tasks, tab.filter);
          const paginatedTasks = getPaginatedTasks(filteredTasks);
          const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

          return (
            <div
              key={index}
              className="border border-[#DDD9D9] dark:border-gray-700 min-h-[70vh] flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 text-[#053C5E] dark:text-gray-200 font-sans transition-colors duration-200 rounded-t-lg border-b border-[#DDD9D9] dark:border-gray-700">
                <div className="flex gap-2 items-center">
                  <span className="text-[#FF1654] dark:text-[#FF6B8B]">{tab.icon}</span>
                  <span className="font-semibold text-base text-[#3E3F5B] dark:text-gray-200">{tab.name} Tasks</span>
                </div>
                <span
                  className={`flex justify-center items-center text-white w-7 h-7 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-md`}
                >
                  {filteredTasks.length}
                </span>
              </div>

              <div className="mt-4 px-4 pb-4 overflow-y-auto flex-1">
                {paginatedTasks.length > 0 ? (
                  paginatedTasks.map((taskData) => (
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
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {renderMobileView()}
      {renderMediumScreenView()}
      {renderDesktopView()}
    </>
  );
};

export default Tabs;