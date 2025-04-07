import React, { useEffect, useState } from 'react';
import { Bell, Moon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [upcomingTasksCount, setUpcomingTasksCount] = useState(0);  // Added state for upcoming tasks count

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/backend/api/notif/get_notifications.php?user_id=${userId}`);
          const data = await response.json();
          if (data.success) {
            // Remove expired notifications
            const filteredNotifications = data.notifications.filter(notification => {
              if (notification.id.toString().startsWith('task-')) {
                const deadlineMatch = notification.message.match(/is due in (\d+) hour/);
                if (deadlineMatch) {
                  const remainingHours = parseInt(deadlineMatch[1]);
                  return remainingHours > 0; // Only keep tasks that are not expired
                }
              }
              return true; // Keep other notifications
            });
            setNotifications(filteredNotifications);
  
            // Calculate the unread notifications
            const realUnread = filteredNotifications.filter(n => n.read_status === 0 && !n.id.toString().startsWith('task-')).length;
            setUnreadCount(realUnread);
  
            // Filter tasks by deadline (tasks with deadlines approaching)
            const deadlineTasks = filteredNotifications.filter(notification => {
              return notification.message.toLowerCase().includes('deadline') && !notification.read_status;
            });
            setUpcomingTasksCount(deadlineTasks.length); // Update the upcoming tasks count
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    };
  
    fetchNotifications();
  }, []);
  

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseClick = () => {
    setShowNotifications(false);
  };

  const handleMarkAsRead = async (id) => {
    if (id.toString().startsWith('task-')) return;
  
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`http://localhost:3000/backend/api/notif/mark_as_read.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          notification_id: id,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        const updatedNotifications = notifications.map((n) =>
          n.id === id ? { ...n, read_status: 1 } : n
        );
        setNotifications(updatedNotifications);
  
        const wasUnread = notifications.find((n) => n.id === id && parseInt(n.read_status) === 0);
        if (wasUnread) {
          setUnreadCount((prev) => prev - 1);
        }
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (taskType) => {
    switch(taskType) {
      case 'deadline':
        return '⏰';
      case 'completed':
        return '✅';
      case 'created':
        return '➕';
      default:
        return '🔔';
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? null : formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <header className="flex justify-between items-center px-8 py-5">
      <div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
          Todo List 🚀
        </h1>
        <p className="text-xs text-gray-600 italic">Make it happen. One task at a time 💪</p>
      </div>

      <div className="flex items-center space-x-6 relative">
        <Moon className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-transform duration-200 hover:scale-110 drop-shadow" />

        <div className="relative cursor-pointer" onClick={handleBellClick}>
          <Bell className="text-gray-800 hover:text-sky-500 transition-transform duration-200 hover:scale-110 drop-shadow" />
          {upcomingTasksCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 shadow-lg z-20">
              {unreadCount}
            </span>
          )}
        </div>

        {showNotifications && (
          <div className="absolute right-0 top-14 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-200">
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-100 to-sky-100 border-b border-gray-300">
              <span className="font-semibold text-gray-800">🔔 Notifications</span>
              <X className="cursor-pointer text-gray-500 hover:text-red-500" size={18} onClick={handleCloseClick} />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-4 text-gray-500 text-sm text-center">You're all caught up! 🎉</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                      notification.read_status === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getNotificationIcon(notification.task_type)}</span>
                      <div>
                        <p className="font-medium text-gray-700">
                          {notification.message}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {notification.task_type && (
                            <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                              {notification.task_type}
                            </span>
                          )}
                          {notification.category && (
                            <span className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                              {notification.category}
                            </span>
                          )}
                          {notification.remaining_hours && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                              {notification.remaining_hours}h left
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {getFormattedDate(notification.created_at) || 'Invalid date'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
