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
  const [draggedTask, setDraggedTask] = useState(null);
  const [dropTargetTab, setDropTargetTab] = useState(null);

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
        setItemsPerPage(5); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { 
      name: "All", 
      filter: "all", 
      badgeColor: "bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700" 
    },
    { 
      name: "Pending", 
      filter: "pending", 
      badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700" 
    },
    { 
      name: "Done", 
      filter: "completed", 
      badgeColor: "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700" 
    },
    { 
      name: "Favs", 
      filter: "favorites", 
      badgeColor: "bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600" 
    },
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

  // Drag and drop handlers
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e, tabFilter) => {
    e.preventDefault();
    setDropTargetTab(tabFilter);
    
    // Add visual feedback for valid drop targets
    if (tabFilter === "pending" || tabFilter === "completed" || tabFilter === "favorites") {
      e.currentTarget.classList.add("bg-indigo-50", "dark:bg-indigo-900/10");
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-indigo-50", "dark:bg-indigo-900/10");
  };

  const handleDrop = (e, targetTabFilter) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-indigo-50", "dark:bg-indigo-900/10");
    
    if (!draggedTask) return;

    // Determine the new status based on the drop target
    if (targetTabFilter === "pending") {
      updateTaskStatus(draggedTask.id, "pending");
    } else if (targetTabFilter === "completed") {
      updateTaskStatus(draggedTask.id, "completed");
    } else if (targetTabFilter === "favorites") {
      // For favorite tab, we toggle the favorite status
      updateTaskStatus(draggedTask.id, null, draggedTask.is_favorite ? 0 : 1);
    }
    
    // Reset drag state
    setDraggedTask(null);
    setDropTargetTab(null);
  };

  const renderMobileView = () => {
    const activeTab = tabs[activeTabIndex];
    const filteredTasks = filterTasks(tasks, activeTab.filter);
    const paginatedTasks = getPaginatedTasks(filteredTasks);
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    return (
      <div className="flex flex-col md:hidden w-full">
        <div className="grid grid-cols-4 gap-1 mx-1 mb-2">
          {tabs.map((tab, index) => {
            const tabTasks = filterTasks(tasks, tab.filter);
            
            return (
              <button
                key={index}
                className={`flex items-center justify-between gap-1 px-3 py-1 rounded-lg border transition-all duration-300 ${
                  activeTabIndex === index
                    ? "bg-white dark:bg-gray-800 border-indigo-300 dark:border-indigo-700 shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                } ${dropTargetTab === tab.filter ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""}`}
                onClick={() => setActiveTabIndex(index)}
                onDragOver={(e) => handleDragOver(e, tab.filter)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, tab.filter)}
              >
                <span className={`text-xs font-medium ${
                  activeTabIndex === index 
                    ? "text-indigo-700 dark:text-indigo-300" 
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors duration-300`}>
                  {tab.name}
                </span>
                <span
                  className={`flex justify-center items-center text-white w-4 h-4 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-sm`}
                >
                  {tabTasks.length}
                </span>
              </button>
            );
          })}
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg mx-1 ${
            dropTargetTab === tabs[activeTabIndex].filter ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""
          }`}
          onDragOver={(e) => handleDragOver(e, tabs[activeTabIndex].filter)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, tabs[activeTabIndex].filter)}
        >
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{tabs[activeTabIndex].name}</span>
            </div>
            <span
              className={`flex justify-center items-center text-white w-5 h-5 rounded-full text-xs font-semibold ${tabs[activeTabIndex].badgeColor}`}
            >
              {filteredTasks.length}
            </span>
          </div>
          
          <div className="p-3">
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
                  onDragStart={handleDragStart}
                  isDragging={draggedTask && draggedTask.id === taskData.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-gray-400 dark:text-gray-500 text-4xl mb-2">
                  {searchQuery ? "🔍" : "📋"}
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {searchQuery ? "No matching tasks found" : "No tasks here yet"}
                </p>
              </div>
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
        <div className="grid grid-cols-4 gap-3 max-w-full">
          {tabs.map((tab, index) => {
            const tabTasks = filterTasks(tasks, tab.filter);
            
            return (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`border cursor-pointer transition-all duration-300 
                  ${activeTabIndex === index 
                    ? "border-indigo-300 dark:border-indigo-700 shadow-lg" 
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"} 
                  rounded-xl bg-white dark:bg-gray-800
                  ${dropTargetTab === tab.filter ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""}`}
                onDragOver={(e) => handleDragOver(e, tab.filter)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, tab.filter)}
              >
                <div className="flex justify-between items-center px-3 py-3 bg-white dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2 items-center">
                    <span className={`font-medium text-sm 
                      ${activeTabIndex === index 
                        ? "text-gray-800 dark:text-gray-200" 
                        : "text-gray-600 dark:text-gray-400"} 
                      truncate transition-colors duration-300`}>
                      {tab.name}
                    </span>
                  </div>
                  <span
                    className={`flex justify-center items-center text-white w-6 h-6 rounded-full text-xs font-semibold ${tab.badgeColor} shadow-md`}
                  >
                    {tabTasks.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div 
          className={`mt-3 border border-gray-200 dark:border-gray-700 min-h-[60vh] rounded-xl shadow-lg bg-white dark:bg-gray-800 ${
            dropTargetTab === tabs[activeTabIndex].filter ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""
          }`}
          onDragOver={(e) => handleDragOver(e, tabs[activeTabIndex].filter)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, tabs[activeTabIndex].filter)}
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200">
                {activeTab.name} Tasks
              </h3>
              <span
                className={`flex justify-center items-center text-white w-6 h-6 rounded-full text-xs font-semibold ${activeTab.badgeColor} shadow-md`}
              >
                {filteredTasks.length}
              </span>
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto h-full">
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
                  onDragStart={handleDragStart}
                  isDragging={draggedTask && draggedTask.id === taskData.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-gray-400 dark:text-gray-500 text-5xl mb-3">
                  {searchQuery ? "🔍" : "📋"}
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                  {searchQuery ? "No matching tasks found" : "No tasks here yet"}
                </p>
              </div>
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
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 max-w-full">
        {tabs.map((tab, index) => {
          const filteredTasks = filterTasks(tasks, tab.filter);
          const paginatedTasks = getPaginatedTasks(filteredTasks);
          const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

          return (
            <div
              key={index}
              className={`border border-gray-200 dark:border-gray-700 min-h-[70vh] flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 
              ${dropTargetTab === tab.filter ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""}`}
              onDragOver={(e) => handleDragOver(e, tab.filter)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, tab.filter)}
            >
              <div className="flex justify-between items-center px-5 py-4 bg-white dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-base text-gray-800 dark:text-gray-200">{tab.name} Tasks</span>
                </div>
                <span
                  className={`flex justify-center items-center text-white w-7 h-7 rounded-full text-sm font-semibold ${tab.badgeColor} shadow-md`}
                >
                  {filteredTasks.length}
                </span>
              </div>

              <div className="mt-4 px-5 pb-4 overflow-y-auto flex-1">
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
                      onDragStart={handleDragStart}
                      isDragging={draggedTask && draggedTask.id === taskData.id}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                      {searchQuery ? "🔍" : "📋"}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                      {searchQuery ? "No matching tasks found" : "No tasks here yet"}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      {searchQuery ? "Try adjusting your search" : "Add your first task to get started"}
                    </p>
                  </div>
                )}
              </div>
              {totalPages > 1 && (
                <div className="mt-auto">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
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