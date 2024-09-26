import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import {
  FaChartBar,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaHouseUser,
  FaFilePdf,
  FaArrowLeft,
  FaBars,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";
import axios from "axios";
import "../User/scrollbar.css";
import UserDataSuper from "./UserDataSuper";
import UserReportSuper from "./UserReportSuper";
import AdminWiseChart from "./AdminWiseChart";
import { adminContext, superadminContext } from "../../context";
import { useNavigate } from "react-router-dom";
import AllUsersChart from "./AllUsersChart";
import AddAdmin from "./AddAdmin";
import AddWarden from "./AddWarden";
import AllAdmins from "./AllAdmins";
import UserForm from "./addUser";
import DialogModal from "../Admin/DialogModal";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("AllUsersChart");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("Admin1");
  const [admins, setAdmins] = useState([]);
  const { superadmin, setsuperadmin } = useContext(superadminContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const dropdownRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminName, setAdminName] = useState(null);
  const [selectedAdminDetails, setSelectedAdminDetails] = useState({});
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getAllAdmins = () => {
    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/getAllAdmins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const sortedAdmins = res.data.sort((a, b) => {
          const nameA = (a.username || "").toLowerCase();
          const nameB = (b.username || "").toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setAdmins(sortedAdmins);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("superadminToken");
    localStorage.removeItem("superadmin");
    navigate("/adminlogin");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("superadminToken");
    if (!token) {
      // console.log("no token here");
      navigate("/adminlogin");
    }
    const username = localStorage.getItem("superadmin");
    setsuperadmin(username);
  }, []);

  useEffect(() => {
    getAllAdmins();
  }, [superadmin]);
  const handleChartOptionClick = (admin) => {
    setActiveTab("charts");
    setSelectedAdmin(admin);
    setIsDropdownOpen(false);
  };

  const handleAdminName = (admin) => {
    setAdminName(admin.username + (admin.lastname ? ` ${admin.lastname}` : ""));
  };

  useEffect(() => {
    // console.log(selectedAdmin);
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
  const capitalizeWords = (string) => {
    if (!string) return "";

    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="flex font-montserrat min-h-svh sm:min-h-screen max-h-screen">
      {/* Sidebar */}
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
            <FaHouseUser className="mr-1 " />
            SuperAdmin
          </h1>
          <button
            onClick={toggleSidebar}
            className="bg-white p-0.5 mr-4 rounded-md md:hidden"
          >
            <div className="flex">
              <FaArrowLeft className="md:hidden text-xs" />
            </div>
          </button>
        </div>
        <ul className="p-2 sm:p-4 text-base">
          <li
            className={
              activeTab === "AllUsersChart"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline  bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("AllUsersChart");
              toggleSidebar();
            }}
          >
            <FaChartBar className="mr-2" />
            Overview
          </li>

          <li
            className={` relative ${
              activeTab === "charts"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44 relative"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            } `}
            onClick={toggleDropdown}
          >
            <FaChartBar className="mr-2" />
            AdminWise Data
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="admins absolute top-6 ml-6 w-48 max-w-60 max-h-60 overflow-auto bg-gray-800 rounded-md shadow-lg"
              >
                {admins.map((admin) => {
                  return (
                    <button
                      key={admin.email}
                      onClick={() => {
                        handleAdminName(admin);
                        handleChartOptionClick(admin.email);
                        toggleSidebar();
                        setSelectedAdminDetails(admin);
                      }}
                      title={capitalizeWords(
                        admin.username +
                          (admin.lastname ? ` ${admin.lastname}` : "")
                      )}
                      className="block px-4 py-2 text-xs text-white w-full hover:bg-gray-600"
                    >
                      {capitalizeWords(
                        admin.username +
                          (admin.lastname ? ` ${admin.lastname}` : "")
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </li>
          <li
            className={
              activeTab === "Userreport"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
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
            className={
              activeTab === "AllAdmins"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("AllAdmins");
              toggleSidebar();
            }}
          >
            <FaUserShield className="mr-2" />
            Admin List{" "}
          </li>
          <li
            className={
              activeTab === "AddAdmin"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("AddAdmin");
              toggleSidebar();
            }}
          >
            <FaUserPlus className="mr-2" />
            New Admin{" "}
          </li>
          <li
            className={
              activeTab === "AddWarden"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("AddWarden");
              toggleSidebar();
            }}
          >
            <FaUserPlus className="mr-2" />
            New Warden{" "}
          </li>
          <li
            className={
              activeTab === "Users"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("Users");
              toggleSidebar();
            }}
          >
            <FaUsers className="mr-2" />
            User List
          </li>
          <li
            className={
              activeTab === "UserForm"
                ? "text-white font-semibold mb-4 cursor-pointer flex items-center underline bg-slate-800 py-2 px-4 rounded-md w-44"
                : "text-gray-300 mb-4 cursor-pointer flex items-center px-2"
            }
            onClick={() => {
              setActiveTab("UserForm");
              toggleSidebar();
            }}
          >
            <FaUserPlus className="mr-2" />
            Add User{" "}
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-full md:ml-64">
        {/* Mobile Navbar */}
        <nav className="md:hidden justify-between w-full items-center bg-gray-700 p-4 shadow-xl">
          <div className="w-full flex items-center justify-between ">
            <button onClick={toggleSidebar}>
              <FaBars className="text-white text-xl md:hidden inline-block" />
            </button>

            <div className="relative inline-block">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gray-800 md:mr-6 text-white  text-sm font-bold py-2 px-4 rounded flex w-fit items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* <nav className="md:hidden flex justify-between items-center bg-gray-700 p-4 shadow-xl">
  <button onClick={toggleSidebar}>
    <FaBars className="text-white text-xl" />
  </button>
</nav> */}

        {/* Desktop Navbar */}
        <nav className="md:flex hidden w-full justify-between items-center bg-gray-700 p-4 shadow-xl">
          <div className="flex">
            <FaUserCircle className="text-white text-2xl mr-2" />
            <p className="text-lg font-semibold text-white">
              Welcome, {capitalizeWords(superadmin)}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gray-800 md:mr-6 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
        {/* Content based on active tab */}
        {activeTab === "AllUsersChart" && <AllUsersChart />}
        {activeTab === "Userreport" && <UserReportSuper />}
        {activeTab === "charts" && (
          <AdminWiseChart admin={selectedAdmin} adminName={adminName} selectedAdminDetails={selectedAdminDetails}/>
        )}
        {activeTab === "Users" && (
          <UserDataSuper showSOSButton={false} showSummaryColumn={true} />
        )}
        {activeTab === "AddAdmin" && <AddAdmin />}
        {activeTab === "AllAdmins" && <AllAdmins />}
        {activeTab === "AddWarden" && <AddWarden />}
        {activeTab === "UserForm" && <UserForm />}
      </div>
      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleLogout}
        paragraph="Are you sure you want to logout?"
        closeBtnText="Cancel"
        submitBtnText="Logout"
      />
    </div>
  );
};

export default SuperAdminDashboard;
