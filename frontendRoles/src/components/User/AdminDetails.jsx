import React, { useEffect, useState } from "react";
import ReportMessage from "../Admin/ReportMessage";

const AdminDetails = ({ onClose, loading, getAdmin, assigned_admin , handleReportClick}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    getAdmin();
  }, []);

  const handleSosClick = () => {
    onClose();
    handleReportClick();
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleReportSubmit = (comment) => {
    setShowReportModal(false);
  };
  const capitalizeWords = (string) => {
    if (!string) return "";
    
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center font-montserrat bg-gray-800 bg-opacity-75 z-40"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-[90%] sm:w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase underline">
            Admin Details
          </h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {loading ? (
          "...loading details"
        ) : (
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {capitalizeWords(assigned_admin.username)}&nbsp;
              {capitalizeWords(assigned_admin.lastname)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {assigned_admin.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Number:</span>{" "}
              {assigned_admin.contactNumber}
            </p>
            <div className="mt-4">
              <p className="text-red-500 font-semibold">
                Feeling down? Contact admin now.
              </p>
              <button
                className="mt-2 bg-red-600 text-white w-full px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={handleSosClick}
              >
                Send SOS
              </button>
            </div>
          </div>
        )}
      </div>
      {showReportModal && (
        <ReportMessage
          onClose={handleCloseReportModal}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
};

export default AdminDetails;
