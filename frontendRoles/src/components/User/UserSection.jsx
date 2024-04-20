import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import Header from "../Home/Header";
import Bg from "./bg3.png";
import ReportMessage from "../Admin/ReportMessage";
import Quotes from "./QuoteCarousel";
// import { useNavigate } from "react-router-dom";

const quotes = [
  "Just as you prioritize your physical health, remember to nurture your mental well-being daily.",
  "Your mental health is not a luxury; it's a necessity. Take time to care for your mind.",
  "In a world that values productivity, remember that mental well-being is essential for true success.",
  "Your mental health influences every aspect of your life. Make self-care a non-negotiable priority.",
  "Mental wellness isn't just about avoiding illness; it's about thriving. Prioritize your mental health.",
];

const UserSection = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportClick = () => {
    setShowReportModal(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleReportSubmit = (comment) => {
    console.log("Report submitted with comment:", comment);
    // axios.post('')
    setShowReportModal(false);
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col h-screen bg-blue-200 font-montserrat"
        style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
      >
        <div className="w-1/2 ml-auto">
        <div className="h-5/6">
          <div className="flex justify-between mt-20 items-center h-1/5 w-full mx-auto ">
            {/* <div className="flex items-center justify-center ">
              <h1 className="text-6xl text-white font-bold">Hello, User!</h1>
            </div> */}
            {/* <div className="flex items-center justify-center ">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src=""
                  alt="User Pic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div> */}
          </div>
          <div className="h-4/5 flex flex-col justify-around  w-10/12 mx-auto rounded-xl mt-6">
            <button className="min-w-60 flex-col items-center w-1/2 mb-4 mx-auto h-32 py-4 px-8 bg-yellow-400 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-yellow-500 transition duration-300 ease-in-out">
              <FiUser className="text-6xl mb-2 mx-auto" />
              <div className="text-xl font-medium">Profile</div>
            </button>
            <button
              onClick={() => {
                navigate("/ChatBot");
              }}
              className="min-w-60 flex-col items-center w-1/2 mb-4 mx-auto py-4 px-8 h-32 bg-green-400 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-green-500 transition duration-300 ease-in-out"
            >
              <FiMessageCircle className="text-6xl mb-2 mx-auto" />
              <div className="text-xl font-medium">Start Survey</div>
            </button>
            <button
              onClick={handleReportClick}
              className="min-w-60 flex-col items-center w-1/2 mb-4 mx-auto py-4 px-8 h-32 bg-red-400 text-gray-800 border-2 border-gray-800 rounded-xl hover:bg-red-500 transition duration-300 ease-in-out"
            >
              <FiAlertCircle className="text-6xl mb-2 mx-auto" />
              <div className="text-xl font-medium">SOS</div>
            </button>
          </div>
        </div>
        {/* <div className="bg-white h-1/6 mb-6 w-1/2 mx-auto">
          <Quotes quotes={quotes} />{" "}
        </div> */}
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
