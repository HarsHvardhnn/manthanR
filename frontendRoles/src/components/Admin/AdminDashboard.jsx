import React, { useState, useEffect, useContext } from "react";
import {
  FaChartBar,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaHouseUser,
  FaBars,
  FaBackward,
  FaArrowLeft,
  FaFilePdf,
  FaBell
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ScoreRangeChart from "./ScoreRangeChart";
import UserData from "./UserData";
import UserReport from "./UserReport";
import SOSNotifications from "./SOSNotifications";
import { adminContext } from "../../context";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("charts");
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { admin, setAdmin } = useContext(adminContext);
  const [selectedFilter, setSelectedFilter] = useState("score");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);

  const getAllQuestions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://manthanr.onrender.com/v1/getAllData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

useEffect(()=>{
  const token = localStorage.getItem('adminToken');
  // if(!token){
  //   navigate('/adminLogin')
  // }
})

  return (
    <div className="flex font-montserrat h-screen">
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-48 md:w-64 bg-gray-700 transition-transform duration-300 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-gray-800 items-center">
          <h1 className="text-white text-base md:text-xl font-bold p-5 flex items-center uppercase">
            <FaHouseUser className="mr-2" />
            Admin
          </h1>
          <button onClick={toggleSidebar} className="bg-white p-0.5 mr-4 rounded-md flex md:hidden">
            <FaArrowLeft className="md:hidden flex text-xs" />
          </button>
        </div>
        <ul className="p-4 md:p-8 text-base">
          <li
            className={`${
              activeTab === "charts"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            } `}
            onClick={() => setActiveTab("charts")}
          >
            <FaChartBar className="mr-2" />
            Chart
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
          <li
            className={
              activeTab === "userreport"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => setActiveTab("userreport")}
          >
            <FaFilePdf className="mr-2" />
            User Report
          </li>
          {/* Add SosNotification tab */}
          <li
            className={
              activeTab === "sosnotification"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-40"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => setActiveTab("sosnotification")}
          >
            <FaBell className="mr-2" />
            SOS Notification
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-full md:ml-64">
        {/* Mobile Navbar */}
        <nav className="lg:hidden flex justify-between items-center bg-gray-700 p-4 shadow-xl">
          <button onClick={toggleSidebar}>
            <FaBars className="text-white text-xl md:hidden" />
          </button>
          <div className="hidden md:flex ">
            <FaUserCircle className="text-white text-2xl lg:mr-2 md:absolute md:left-72 md:top-6" />
            <p className="text-lg font-semibold text-white">Welcome back,{admin}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setAdmin("");
                localStorage.removeItem('adminToken');
                navigate("/adminlogin");
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
            <p className="text-lg font-semibold text-white">{admin}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setAdmin("");
                localStorage.removeItem('adminToken');
                navigate("/adminlogin");
              }}
              className="bg-gray-800 mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>

        {/* Content based on activeTab */}
        {activeTab === "charts" && <ScoreRangeChart />}
        {activeTab === "allUsers" && <UserData />}
        {activeTab === "userreport" && <UserReport />}
        {/* {activeTab === "sosnotification" && <SOSNotifications />} */}
      </div>
    </div>
  );
};

export default AdminDashboard;
