import React, { useState } from "react";
import ReportMessage from "../Admin/ReportMessage";

const AdminDetails = ({ onClose }) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const adminData = {
    name: "John Doe",
    email: "john.doe@example.com",
    number: "+1234567890",
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleReportSubmit = (comment) => {
    console.log("Report submitted with comment:", comment);
    // axios.post('')
    setShowReportModal(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center font-montserrat bg-gray-800 bg-opacity-75 z-40">
      <div className="bg-white w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase underline">Admin Details</h2>
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
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {adminData.name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {adminData.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Number:</span> {adminData.number}
          </p>
          <div className="mt-4">
            <p className="text-red-500 font-semibold">
              Feeling depressed? Contact admin now.
            </p>
            <button
              className="mt-2 bg-red-600 text-white w-full px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={handleReportClick}
            >
              Send SOS
            </button>
          </div>
        </div>
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