import { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import { useUser } from '../../context/authContext.jsx';
import socketService from '../../Services/socket.js';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

export const Notification = () => {
  const token = useUser();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(() => {
    const storedCount = localStorage.getItem('notificationCount');
    return storedCount ? JSON.parse(storedCount) : 0;
  });
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const notificationRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleNotificationClick = (id) => {
    navigate(`/deliveries/${id}`);
    setNotificationCount(notificationCount - 1);
    const newNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
    localStorage.setItem('notificationCount', JSON.stringify(notificationCount - 1));
    setIsOpen(false);
  };

  return (
    <div ref={notificationRef} className="notificationNavContainer" onClick={() => {
      toggleDropdown();
      handleClick();
    }}>
      <div className={`dropdown-toggle btn-notification ${isOpen ? 'open' : ''} ${isClicked ? 'clicked' : ''}`}>
        <FaBell className="iconNotificationNav" />
        {notificationCount > 0 && (
          <span className="notificationCountNav">{notificationCount}</span>
        )}
      </div>

      <ul className={`menuNotificationNav ${isOpen ? 'open' : ''}`}>
        {notifications.length === 0 ? (
          <li className="noNotificationsNav">No tienes notificaciones</li>
        ) : (
          notifications.map((notification, index) => (
            <li key={index} className="notificationItemNav" onClick={() => handleNotificationClick(notification.id)}>
              <p>{notification.message}</p>
              <p>{notification.details}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
