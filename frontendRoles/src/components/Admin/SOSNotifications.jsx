import React, { useState } from "react";

const SOSNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userId: 3,
      message: "User with ID 7 needs assistance ASAP!",
      read: false,
    },
    {
      id: 2,
      userId: 7,
      message: "User with ID 7 needs assistance ASAP!",
      read: false,
    },
    {
      id: 3,
      userId: 10,
      message: "User with ID 7 needs assistance ASAP!",
      read: true,
    },
  ]);

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg md:text-xl font-semibold mb-4">SOS Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${
            notification.read ? "bg-gray-200" : "bg-yellow-100"
          } p-4 rounded-lg shadow mb-4`}
        >
          <p className="text-base md:text-lg">{notification.message}</p>
          <div className="mt-2 text-base md:text-lg">
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
              >
                Mark as Read
              </button>
            )}
            {notification.read && (
              <button
                onClick={() => markAsUnread(notification.id)}
                className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Mark as Unread
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SOSNotifications;
