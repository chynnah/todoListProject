import React, { useEffect, useState } from 'react';
import { Bell, Moon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Search from './Search';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
        setUnreadCount(prev => prev - 1); 
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
    <header className="flex justify-between items-center px-8 py-5 mt-[10px]">
      <div>
        <h1 className='font-sans font-extrabold text-[#FF1654] text-[32px] ml-[50px]'>me.list</h1>
      </div>

      <div className='mr-[40px]'>
        <div className="flex items-center space-x-6 relative">
          {/*  Search */}
          <Search onSearch={(query) => console.log("Searching for:", query)} />
          
          {/* Moon */}
          <Moon className="text-gray-800 hover:text-[#FF1654] cursor-pointer transition-transform duration-200 hover:scale-110 drop-shadow w-6 h-6" />
          
          <div className="relative cursor-pointer" onClick={handleBellClick}>
            {/* Bell */}
            <Bell className="text-gray-800 hover:text-[#FF1654] transition-transform duration-200 hover:scale-110 drop-shadow w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF1654] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md z-20 animate-ping-slow">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-0 top-14 w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-50 overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center px-4 py-3 bg-[#FF1654] text-white">
            <span className="font-semibold">🔔 Notifications</span>
            <X className="cursor-pointer hover:text-gray-300" size={18} onClick={handleCloseClick} />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-4 text-[#283D3B] text-sm text-center">You're all caught up! 🎉</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    notification.read_status === 0
                      ? 'bg-[#FFF3F6] hover:bg-[#FFECEF]'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{getNotificationIcon(notification.task_type)}</span>
                    <div>
                      <p className="font-medium text-[#283D3B]">{notification.message}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {notification.task_type && (
                          <span className="text-xs px-2 py-0.5 bg-[#FFECEF] text-[#FF1654] rounded-full">{notification.task_type}</span>
                        )}
                        {notification.category && (
                          <span className="text-xs px-2 py-0.5 bg-[#FFEEF2] text-[#FF1654] rounded-full">{notification.category}</span>
                        )}
                        {notification.remaining_hours && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-[#FF1654] rounded-full">{notification.remaining_hours}h left</span>
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
    </header>
  );
};

export default Header;
