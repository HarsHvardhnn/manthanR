import React, { useEffect, useState } from "react";
import { BallTriangle, InfinitySpin } from "react-loader-spinner";

const SOSNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userId: 3,
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat libero at Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat libero at dolor lacinia, a fermentum lectus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat libero at dolor lacinia, a fermentum lectus  dolor lacinia, a fermentum lectus laoreet.",
      read: false,
    },
    {
      id: 2,
      userId: 7,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      message:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      read: false,
    },
    {
      id: 3,
      userId: 10,
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-555-5555",
      message:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
      read: true,
    },
  ]);

  useEffect(()=>{

  },[]);


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
    <div className="p-4 overflow-y-auto h-[80%]">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        SOS Notifications
      </h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${
            notification.read ? "bg-gray-200" : "bg-yellow-100"
          } p-4 rounded-lg shadow mb-4`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Name: </span>
                {notification.fullName}
              </p>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Email: </span>
                {notification.email}
              </p>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Phone: </span>
                {notification.phoneNumber}
              </p>
            </div>
          </div>
          <p className="mt-2 text-base md:text-lg">
            <span className="font-semibold">Message: </span>
            {notification.message}
          </p>
          <button
            onClick={
              notification.read
                ? () => markAsUnread(notification.id)
                : () => markAsRead(notification.id)
            }
            className={`px-3 py-1 rounded mt-2 ${
              notification.read ? "bg-yellow-500" : "bg-blue-500"
            } text-white`}
          >
            {notification.read ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SOSNotifications;
