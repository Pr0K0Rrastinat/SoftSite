import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../styles/StudentNotification.css';
import ButtonPage from '../components/buttonpagestudent';

const StudentNotification = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://backendswt.onrender.com/api/notification/get', {
          method: 'POST',
          body: JSON.stringify({ to: user.getId() }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setNotifications(data);
          setError('');
        } else {
          setError(data.message || 'Failed to fetch notifications.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Функция для обработки клика на уведомлении
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  // Функция для обработки закрытия детальной информации
  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className='User-info'>User: User-name</div>
      </div>
      <div className="line"></div>
      <div className="notification-container">
        <div className='left-block'>
          <ButtonPage></ButtonPage>
        </div>
        <div className='right-block'>
          <h1>Notifications</h1>
          {selectedNotification ? (
            <div className="selected-notification">
              <h2>Notification Details</h2>
              <div>From: {selectedNotification.from}</div>
              <div>Title: {selectedNotification.title}</div>
              <div>Message: {selectedNotification.message}</div>
              <button onClick={handleCloseDetails}>Back</button>
            </div>
          ) : (
            <div className="notification-table">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Information</th>
                    <th>Sender</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan="3">Loading...</td></tr>}
                  {!loading && !error && notifications.length === 0 && <tr><td colSpan="3">No notifications found.</td></tr>}
                  {!loading && !error && notifications.length > 0 && (
                    notifications.map((notification, index) => (
                      <tr key={index} onClick={() => handleNotificationClick(notification)}>
                        <td>{index + 1}</td>
                        <td>{notification.title}: {notification.message}</td>
                        <td>{notification.from}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNotification;
