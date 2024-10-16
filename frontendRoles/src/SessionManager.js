import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { IoWarning } from "react-icons/io5";

const Modal = ({ isOpen, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 font-montserrat">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-out scale-95 hover:scale-100">
        <h4 className="text-2xl font-bold mb-4 flex items-center justify-center text-gray-800">
          <span className="text-red-600 text-xl sm:text-3xl mr-2">
            <IoWarning className="text-3xl" />
          </span>
          Session Expired
        </h4>
        <p className="mb-6 text-gray-600 text-center">
          Please log in again to continue
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onLogin}
            className="px-6 py-3 font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-all duration-200 ease-in-out"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

const SessionManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [expiredSessionType, setExpiredSessionType] = useState(null);

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setExpiredSessionType("user");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isProfileComplete");
        setModalOpen(true);
      }
    }
  };

  const checkAdminTokenExpiry = () => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      const decodedToken = jwtDecode(adminToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setExpiredSessionType("admin");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        setModalOpen(true);
      }
    }
  };

  const checkSuperadminTokenExpiry = () => {
    const superadminToken = localStorage.getItem("superadminToken");
    if (superadminToken) {
      const decodedToken = jwtDecode(superadminToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setExpiredSessionType("admin");
        localStorage.removeItem("superadminToken");
        localStorage.removeItem("superadmin");
        setModalOpen(true);
      }
    }
  };

  useEffect(() => {
    checkTokenExpiry();
    checkAdminTokenExpiry();
    checkSuperadminTokenExpiry();

    const intervalId = setInterval(() => {
      checkTokenExpiry();
      checkAdminTokenExpiry();
      checkSuperadminTokenExpiry();
    }, 120000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLoginRedirect = () => {
    setModalOpen(false);
    if (expiredSessionType === "user") {
      window.location.href = "/login";
    } else if (expiredSessionType === "admin") {
      window.location.href = "/adminlogin";
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onLogin={handleLoginRedirect} />
    </div>
  );
};

export default SessionManager;