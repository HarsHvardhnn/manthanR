import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

const SOSNotifications = ({ admin }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const getsos = () => {
    const token = localStorage.getItem("adminToken");
    setLoading(true);
    const url = `https://manthanr.onrender.com/v1/get-all-sos/${admin.adminID}`;
    const local_url = `http://localhost:3030/v1/get-all-sos/${admin.adminID}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNotifications(res.data);
        // console.log(res)
      })
      .catch((Err) => {
        console.log(Err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    getsos();
  }, []);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  

  return (
    <div className="px-2 sm:px-4 h-[85%]">
      <h2 className="text-2xl font-semibold mb-6 pt-4 border-b-2 border-gray-200 uppercase ">
        SOS Notifications
      </h2>
      {loading ? (
        <div className=" w-full flex flex-col justify-center items-center text-lg">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4299e1"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      ) :  notifications.length === 0 ? (
        <p className=" text-red-500">No data available</p>
      ) :(
        <div className="overflow-y-auto h-[calc(100vh-160px)]">
        {notifications
          ?.slice()
          .reverse()
          .map((notification) => (
            <div
              key={notification._id}
              className={`${
                notification.read ? "bg-gray-200" : "bg-yellow-100"
              } p-4 rounded-lg shadow mb-4`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base md:text-lg">
                    <span className="font-semibold">Name: </span>
                    {capitalizeFirstLetter(notification?.userName)}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-semibold">Email: </span>
                    {notification?.user?.email}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-semibold">Phone: </span>
                    {notification?.user?.contactNumber}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Message: </span>
                {notification?.message}
              </p>
              {/* <button
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
          </button> */}
            </div>
          ))}
          </div>
      )}
    </div>
  );
};

export default SOSNotifications;
