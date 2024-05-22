import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useUser } from '../../context/authContext.jsx';
import socketService from '../../Services/socket.js';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import './Notification.css';

export const Notification = () => {
  const token = useUser();
  const [notificationCount, setNotificationCount] = useState(() => {
    const storedCount = localStorage.getItem('notificationCount');
    return storedCount ? JSON.parse(storedCount) : 0;
  });
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const userDataFromToken = getUserDataFromToken(token);
      const driverId = userDataFromToken.id_user;

      socketService.on(`deliveryAssigned-${driverId}`, (data) => {
        console.log(`Nuevo envío asignado: ${data.message}`);
        setNotificationCount(prevCount => {
          const newCount = prevCount + 1;
          localStorage.setItem('notificationCount', JSON.stringify(newCount));
          return newCount;
        });
        setNotifications(prevNotifications => {
          const newNotifications = [...prevNotifications, data];
          localStorage.setItem('notifications', JSON.stringify(newNotifications));
          return newNotifications;
        });
      });

      return () => {
        socketService.off(`deliveryAssigned-${driverId}`);
      };
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
    setNotifications([]);
    localStorage.removeItem('notificationCount');
    localStorage.removeItem('notifications');
    setIsOpen(false);
  };

  return (
    <div className="notification-icon-container" onClick={toggleDropdown}>
      <div className="notification-icon">
        <FaBell />
        {notificationCount > 0 && (
          <span className="notification-count">{notificationCount}</span>
        )}
      </div>
      {isOpen && (
        <ul className="notification-dropdown open">
          {notifications.map((notification, index) => (
            <li key={index} onClick={handleNotificationClick}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
