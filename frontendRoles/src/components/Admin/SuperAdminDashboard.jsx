import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  FaChartBar,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaHouseUser,
  FaBell,
  FaFilePdf,
  FaArrowLeft,
  FaBars,
} from "react-icons/fa";
import axios from "axios";
// import { Link } from "eact-router-dom";
import UserDataSuper from "../Admin/UserDataSuper";
import SOSNotifications from "./SOSNotifications";
import UserReportSuper from "./UserReportSuper";
import AdminWiseChart from "./AdminWiseChart";
import { adminContext, superadminContext } from "../../context";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Notifications"); // default active tab
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("Admin1"); // Track selected admin
  const [admins, setAdmins] = useState([]);
  const { superadmin, setsuperadmin } = useContext(superadminContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAllAdmins = () => {
    axios
      .get("https://manthanr.onrender.com/v1/getAllAdmins")
      .then((res) => {
        setAdmins(res.data);
        console.log(res.data);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const handleLogout = () => {
    // Your logout logic here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("superadminToken");
    if (!token) {
      console.log("no token here");
      navigate("/superadminlogin");
    }
    getAllAdmins();
  }, []);
  const handleChartOptionClick = (admin) => {
    setActiveTab("charts");
    setSelectedAdmin(admin); // Update selectedAdmin state with the clicked admin
    setIsDropdownOpen(false);
  };

  // Log selectedAdmin whenever it changes
  useEffect(() => {
    console.log(selectedAdmin);
  }, [selectedAdmin]);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(!showSidebar);
    }
  };
  const getPadding = () => {
    const screenWidth = window.innerWidth;
    return screenWidth >= 768 ? "1.365rem" : undefined;
  };

  return (
    <div className="flex font-montserrat h-screen">
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-48 md:w-64 bg-gray-700 transition-transform duration-300 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-gray-800 items-center">
          <h1
            className="text-white text-base md:text-xl font-bold p-4 flex items-center uppercase"
            style={{ padding: getPadding() }}
          >
            <FaHouseUser className="mr-1 " />
            SuperAdmin
          </h1>
          <button
            onClick={toggleSidebar}
            className="bg-white p-0.5 mr-4 rounded-md flex md:hidden"
          >
            <FaArrowLeft className="md:hidden flex text-xs" />
          </button>
        </div>
        <ul className="p-4 md:p-8 text-base">
          <li
            className={
              activeTab === "Notifications"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline  bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("Notifications");
              toggleSidebar();
            }}
          >
            <FaBell className="mr-2" />
            Notifications
          </li>
          <li
            className={
              activeTab === "Userreport"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("Userreport");
              toggleSidebar();
            }}
          >
            <FaFilePdf className="mr-2" />
            Reports
          </li>
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
                {admins.map((admin) => {
                  return (
                    <button
                      onClick={() => {
                        handleChartOptionClick(admin.email);
                        toggleSidebar();
                      }}
                      className="block px-4 py-2 text-sm text-white w-full hover:bg-gray-600"
                    >
                      {admin.username}
                    </button>
                  );
                })}
              </div>
            )}
          </li>
          <li
            className={
              activeTab === "Users"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("Users");
              toggleSidebar();
            }}
          >
            <FaUsers className="mr-2" />
            Users
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-full md:ml-64">
        {/* Mobile Navbar */}
        <nav className="lg:hidden flex justify-between items-center bg-gray-700 p-4 shadow-xl">
          <button onClick={toggleSidebar}>
            <FaBars className="text-white text-xl md:hidden" />
          </button>
          <div className="hidden md:flex">
            <FaUserCircle className="text-white text-2xl lg:mr-2 md:absolute md:left-72 md:top-6" />
          </div>
          <div className="relative">
            <button
              onClick={() => {
                // setsuperadmin("");
                localStorage.removeItem("superadminToken");
                // console.log(localStorage.getItem("superadminToken"), "ji");
                navigate("/superadminlogin");
              }}
              className="bg-gray-800 md:mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex justify-between items-center bg-gray-700 p-4 shadow-xl">
          <div className="flex">
            <FaUserCircle className="text-white text-2xl mr-2" />
            <p className="text-lg font-semibold text-white">
              Welcome {superadmin}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                // setsuperadmin("");
                localStorage.removeItem("superadminToken");
                // console.log(localStorage.getItem("superadminToken"), "ji");
                navigate("/superadminlogin");
              }}
              className="bg-gray-800 md:mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
        {/* Content based on active tab */}
        {activeTab === "Notifications" && <SOSNotifications />}
        {activeTab === "Userreport" && <UserReportSuper />}
        {activeTab === "charts" && <AdminWiseChart admin={selectedAdmin} />}
        {activeTab === "Users" && (
          <UserDataSuper showSOSButton={false} showSummaryColumn={true} />
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
