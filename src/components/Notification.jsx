import React, { useState } from 'react';

const Notifications = ({ notifications }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Функция для обработки клика на сообщении
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <div className="notification-list">
      {/* Отображаем список сообщений */}
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} onClick={() => handleNotificationClick(notification)}>
            {/* Отображаем краткую информацию о сообщении */}
            <div>From: {notification.from}</div>
            <div>Title: {notification.title}</div>
          </li>
        ))}
      </ul>
      {/* Показываем подробную информацию о выбранном сообщении */}
      {selectedNotification && (
        <div className="notification-details">
          <h2>Message Details</h2>
          <div>From: {selectedNotification.from}</div>
          <div>Title: {selectedNotification.title}</div>
          <div>Message: {selectedNotification.message}</div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
