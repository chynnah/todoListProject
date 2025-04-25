import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isHovered, setIsHovered] = useState(false);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };
  
  // Navigate to next day
  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };
  
  // Reset to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Format date information
  const formatDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return {
      weekday: dayNames[date.getDay()],
      month: monthNames[date.getMonth()],
      day: date.getDate(),
      year: date.getFullYear(),
      isToday: date.toDateString() === new Date().toDateString()
    };
  };

  const date = formatDate(currentDate);
  
  return (
    <div className="px-4 md:px-8 lg:px-12 my-6 md:my-8 lg:my-10">
      <div 
        className="relative transition-all duration-300 transform hover:scale-102"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3 md:gap-4 lg:gap-4">
          {/* Day number in circle*/}
          <div 
            className={`flex items-center justify-center w-25 h-25 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full
            ${date.isToday 
              ? 'bg-gradient-to-br from-[#A31621] to-[#D64045] dark:from-[#FF4757] dark:to-[#FF6B6B]' 
              : 'bg-[#A9BFA8]/20 dark:bg-gray-800'} 
            shadow-md transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
            onClick={goToToday}
          >
            <span className={`font-bold text-3xl md:text-4xl lg:text-5xl 
              ${date.isToday ? 'text-white' : 'text-[#053C5E] dark:text-gray-200'}`}>
              {date.day}
            </span>
          </div>
          
          {/* Date text and navigation */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#053C5E] dark:text-gray-200">
                {date.month} {date.year}
              </h2>
              
              {/* Navigation controls */}
              <div className={`ml-3 flex items-center gap-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                  onClick={goToPreviousDay}
                  className="p-1 rounded-full hover:bg-[#A9BFA8]/20 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft size={18} className="text-[#053C5E] dark:text-gray-400" />
                </button>
                <button 
                  onClick={goToToday}
                  className="px-2 py-0.5 text-xs font-medium text-[#053C5E] dark:text-gray-300 hover:bg-[#A9BFA8]/20 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  Today
                </button>
                <button 
                  onClick={goToNextDay}
                  className="p-1 rounded-full hover:bg-[#A9BFA8]/20 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight size={18} className="text-[#053C5E] dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              <span className="text-base md:text-lg font-medium text-[#053C5E]/80 dark:text-gray-400">
                {date.weekday}
              </span>
              <div className="mx-2 h-1 w-1 rounded-full bg-[#A9BFA8]"></div>
              <div className="flex items-center text-sm md:text-base text-[#053C5E]/70 dark:text-gray-400">
                <Clock size={14} className="mr-1 text-[#A31621] dark:text-[#FF6B6B]" />
                {time}
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="mt-1 md:mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-medium
                ${getDayStatusStyle(date.weekday)}`}>
                {getDayStatus(date.weekday)}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// Function to get status message based on day of week
function getDayStatus(weekday) {
  const statusMap = {
    "Monday": "Week Starting",
    "Tuesday": "Building Momentum",
    "Wednesday": "Midweek Progress",
    "Thursday": "Almost There",
    "Friday": "Weekend Approaching",
    "Saturday": "Weekend Vibes",
    "Sunday": "Week Preparation"
  };
  
  return statusMap[weekday] || "Today's Focus";
}

// Function to get style based on day of week
function getDayStatusStyle(weekday) {
  const styles = {
    "Monday": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Tuesday": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "Wednesday": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Thursday": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Friday": "bg-[#FAFFC5] text-[#053C5E] dark:bg-yellow-900/30 dark:text-yellow-200",
    "Saturday": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "Sunday": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  };
  
  return styles[weekday] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
}

export default DateDisplay;