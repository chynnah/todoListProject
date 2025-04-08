import React, { useEffect, useState } from 'react';
import { Bell, Moon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import logo from '../assets/img/logo.png';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [upcomingTasksCount, setUpcomingTasksCount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    const fetchNotifications = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/backend/api/notif/get_notifications.php?user_id=${userId}`);
        const data = await response.json();

        if (data.success) {
          const filteredNotifications = data.notifications.filter(notification => {
            const createdAt = new Date(notification.created_at);
            if (notification.id.toString().startsWith('task-')) {
              const match = notification.message.match(/is due in (\d+) hour/);
              if (match) {
                const remaining = parseInt(match[1]);
                return remaining > 0;
              }
              return true;
            }
            return !isNaN(createdAt);
          });

          filteredNotifications.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
          setNotifications(filteredNotifications);

          const unread = filteredNotifications.filter(n => n.read_status === 0 && !n.id.toString().startsWith('task'));
          setUnreadCount(unread.length);

          const deadlineTasks = filteredNotifications.filter(n =>
            n.message.toLowerCase().includes('deadline') && n.read_status === 0
          );
          setUpcomingTasksCount(deadlineTasks.length);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
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
        const updated = notifications.map((n) => n.id === id ? { ...n, read_status: 1 } : n);
        setNotifications(updated);
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (taskType) => {
    switch (taskType) {
      case 'deadline': return '⏰';
      case 'completed': return '✅';
      case 'created': return '➕';
      default: return '🔔';
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-5 mt-[-20px]">
      <div>
        <img src={logo} alt="ListAll logo" className="h-30 w-auto " />
      </div>

      <div className='mr-3'>
        <div className="flex items-center space-x-6 relative">
          <Moon className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-transform duration-200 hover:scale-110 drop-shadow" />

        <div className="relative cursor-pointer" onClick={handleBellClick}>
            <Bell className="text-gray-800 hover:text-sky-500 transition-transform duration-200 hover:scale-110 drop-shadow" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md z-20 animate-ping-slow">
                {unreadCount}
              </span>
            )}
        </div>
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
                        <p className="font-medium text-gray-700">{notification.message}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {notification.task_type && (
                            <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">{notification.task_type}</span>
                          )}
                          {notification.category && (
                            <span className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">{notification.category}</span>
                          )}
                          {notification.remaining_hours && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">{notification.remaining_hours}h left</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {notification.created_at ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : 'Just now'}
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
