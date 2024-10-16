import React, { useState, useEffect, useContext } from "react";
import {
  FaChartBar,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaHouseUser,
  FaBars,
  FaArrowLeft,
  FaBell,
  FaExclamationCircle,
} from "react-icons/fa";
import ScoreRangeChart from "./ScoreRangeChart";
import UserData from "./UserData";
import UserReport from "./UserReport";
import SOSNotifications from "./SOSNotifications";
import { adminContext } from "../../context";
import { useNavigate } from "react-router-dom";
import DialogModal from "./DialogModal";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("charts");
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { admin, setAdmin } = useContext(adminContext);
  const [selectedFilter, setSelectedFilter] = useState("score");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(!showSidebar);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/adminLogin");
    }
    const object = localStorage.getItem("admin");
    const obj = JSON.parse(object);
    setAdmin(obj);
  }, []);

  const handleLogout = () => {
    setAdmin("");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  const getPadding = () => {
    const screenWidth = window.innerWidth;
    return screenWidth >= 768 ? "1.365rem" : undefined;
  };
  const capitalizeWords = (string) => {
    if (!string) return "";
    
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  return (
    <div className="flex font-montserrat min-h-svh sm:min-h-screen max-h-screen">
      <div
        className={`absolute top-0 left-0 bottom-0 w-48 md:w-64 bg-gray-700 transition-transform duration-300 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-gray-800 items-center">
          <h1
            className="text-white text-base md:text-xl font-bold py-[22px] px-4 flex items-center uppercase"
            style={{ padding: getPadding() }}
          >
            <FaHouseUser className="mr-2" />
            Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="bg-white p-0.5 mr-4 rounded-md md:hidden"
          >
            <div className="flex">
              <FaArrowLeft className="text-xs" />
            </div>
          </button>
        </div>
        <ul className="p-2 sm:p-4 text-base">
          <li
            className={`${
              activeTab === "charts"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            } `}
            onClick={() => {
              setActiveTab("charts");
              toggleSidebar();
            }}
          >
            <FaChartBar className="mr-2" />
            Overview
          </li>
          <li
            className={
              activeTab === "allUsers"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("allUsers");
              toggleSidebar();
            }}
          >
            <FaUsers className="mr-2" />
            User List
          </li>
          <li
            className={
              activeTab === "userreport"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("userreport");
              toggleSidebar();
            }}
          >
            <FaExclamationCircle className="mr-2" />
            Reported Users
          </li>

          <li
            className={
              activeTab === "sosnotification"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("sosnotification");
              toggleSidebar();
            }}
          >
            <FaBell className="mr-2" />
            SOS Notifications
          </li>
        </ul>
      </div>
      <div className="w-full md:ml-64">
        <nav className="lg:hidden bg-gray-700 p-4 shadow-xl">
          <div className="flex justify-between items-center">
            <button onClick={toggleSidebar}>
              <FaBars className="text-white text-xl md:hidden" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gray-800 md:mr-6 text-white text-sm font-bold py-2 px-4 rounded inline-flex items-center"
              >
                {" "}
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>
        <nav className="hidden lg:flex justify-between items-center bg-gray-700 p-4 shadow-xl">
          <div className="flex">
            <FaUserCircle className="text-white text-2xl mr-2" />
            <p className="text-lg font-semibold text-white">
              Welcome, {capitalizeWords(admin.username)}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gray-800 mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
        {activeTab === "charts" && <ScoreRangeChart admin={admin} />}
        {activeTab === "allUsers" && <UserData admin={admin} />}
        {activeTab === "userreport" && <UserReport admin={admin} />}
        {activeTab === "sosnotification" && <SOSNotifications admin={admin} />}
        <DialogModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleLogout}
          paragraph="Are you sure you want to logout?"
          closeBtnText="Cancel"
          submitBtnText="Logout"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
