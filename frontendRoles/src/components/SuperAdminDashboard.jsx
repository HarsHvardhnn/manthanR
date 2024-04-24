import React, { useState } from "react";
import { FaChartBar, FaUsers, FaUserCircle, FaSignOutAlt, FaHouseUser } from "react-icons/fa";
import { BallTriangle } from "react-loading-icons";
import { Link } from "react-router-dom";
import UserData from './UserDataSuper'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("charts");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleLogout = () => {
    // Your logout logic here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChartOptionClick = (option) => {
    setIsLoading(true); // Set loading state to true
    setActiveTab(option);
    setIsDropdownOpen(false);
    // Simulate loading delay (remove in production)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after some delay
    }, 1000);
  };

  return (
    <div className="flex h-screen font-montserrat">
      <div className="bg-gray-700 w-1/5">
        <h1 className="text-white text-xl font-bold bg-gray-800 p-5 flex items-center">
          <FaHouseUser className="mr-2" />
          Admin Dashboard
        </h1>
        <ul className="p-8 text-base">
          <li
            className={`${
              activeTab === "charts"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40 relative"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            } `}
            onClick={toggleDropdown}
          >
            <FaChartBar className="mr-2" />
            Charts
            {isDropdownOpen && (
              <div className="absolute mt-40 w-48 bg-gray-800 rounded-md shadow-lg">
                <button
                  onClick={() => handleChartOptionClick("option1")}
                  className="block px-4 py-2 text-sm text-white w-full hover:bg-gray-600"
                >
                  Admin 1
                </button>
                <button
                  onClick={() => handleChartOptionClick("option2")}
                  className="block px-4 py-2 text-sm text-white w-full hover:bg-gray-600"
                >
                  Admin 2
                </button>
                <button
                  onClick={() => handleChartOptionClick("option3")}
                  className="block px-4 py-2 text-sm text-white w-full hover:bg-gray-600"
                >
                  Admin 3
                </button>
                <button
                  onClick={() => handleChartOptionClick("option4")}
                  className="block px-4 py-2 text-sm text-white w-full hover:bg-gray-600"
                >
                  Admin 4
                </button>
              </div>
            )}
          </li>
          <li
            className={
              activeTab === "allUsers"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => setActiveTab("allUsers")}
          >
            <FaUsers className="mr-2" />
            Users
          </li>
        </ul>
      </div>
      <div className="w-4/5">
        <nav className="flex justify-between items-center bg-gray-700 p-4 shadow-xl">
          <div className="flex">
            <FaUserCircle className="text-white text-2xl mr-2" />
            <p className="text-lg font-semibold text-white">Admin Name</p>
          </div>
          <div className="relative">
            <button className="bg-gray-800 mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            {/* Loader component */}
            <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" />
          </div>
        )}
        {!isLoading && activeTab === "allUsers" && <UserData showSOSButton={false} showSummaryColumn={true} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
