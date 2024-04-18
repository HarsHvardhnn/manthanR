import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMessageCircle,
  FiAlertCircle,
  FiSettings,
} from "react-icons/fi";
import Header from "../Home/Header";
import Bg from "./bg.png";
import ReportMessage from "../Admin/ReportMessage";

const UserSection = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleReportSubmit = (comment) => {
    console.log("Report submitted with comment:", comment);
    setShowReportModal(false); 
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col h-screen bg-blue-200 font-montserrat"
        style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
      >
        <div className="flex justify-between mt-12 items-center h-2/5 w-1/2 mx-auto">
          <div className="flex items-center justify-center ">
            <h1 className="text-4xl font-bold">Hello, User!</h1>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src="path_to_user_image"
                alt="User Pic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-3/5 flex flex-wrap justify-around items-center w-3/4 mx-auto rounded-xl mb-40">
          <button className="min-w-60 flex-col items-center py-4 px-8 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out">
            <FiUser className="text-6xl mb-2" />
            <div className="text-xl">Profile</div>
          </button>
          <button onClick={() => {
            navigate("/ChatBot")
          }} className="min-w-60 flex-col items-center py-4 px-8 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out">
            <FiMessageCircle className="text-6xl mb-2" />
            <div className="text-xl">ChatBot</div>
          </button>
          <button
            onClick={handleReportClick}
            className="min-w-60 flex-col items-center py-4 px-8 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            <FiAlertCircle className="text-6xl mb-2" />
            <div className="text-xl">SOS</div>
          </button>
          <button className="min-w-60 flex-col items-center py-4 px-8 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out">
            <FiSettings className="text-6xl mb-2" />
            <div className="text-xl">abcd</div>
          </button>
        </div>
      </div>
      {/* Report Modal */}
      {showReportModal && (
        <ReportMessage
          onClose={handleCloseReportModal}
          onSubmit={handleReportSubmit}
        />
      )}
    </>
  );
};

export default UserSection;
