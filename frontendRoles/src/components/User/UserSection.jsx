import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import Header from "../Home/Header";
import "./user.css";
import Bg from "./bg1.png";
import Bg2 from "./bg2.png";
import Bg3 from "./bg3.png";
import Bg4 from "./bg4.png";
import Img from "./img.png";
import ReportMessage from "../Admin/ReportMessage";
import Quotes from "./QuoteCarousel";
import AdminDetails from "./AdminDetails";
import ViewProfile from "./ViewProfile";
import { userContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";

const quotes = [
  "Just as you prioritize your physical health, remember to nurture your mental well-being daily.",
  "Your mental health is not a luxury; it's a necessity. Take time to care for your mind.",
  "In a world that values productivity, remember that mental well-being is essential for true success.",
  "Your mental health influences every aspect of your life. Make self-care a non-negotiable priority.",
  "Mental wellness isn't just about avoiding illness; it's about thriving. Prioritize your mental health.",
];

const axiosConfig = axios.create({
  baseURL: "http://localhost:3030/v1", // Base URL for API requests

  // Additional configuration options can be added here
});

const UserSection = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAdminData, setShowAdminData] = useState(false);
  const { user } = useContext(userContext);
  const [assigned_admin, setAssigned_admin] = useState("");
  const [User, setuser] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [pfp, setPfp] = useState("");

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const adminData = () => {
    setShowAdminData(true);
  };
  const closeAdminData = () => {
    setShowAdminData(false);
  };

  const viewProfileClicked = () => {
    setShowProfile(true);
  };
  const closeProfile = () => {
    setShowProfile(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getpfp();
  });
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const getpfp = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/pfp/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPfp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setBgImageUrl(Bg3);
    } else if (screenWidth > 639 && screenWidth < 1023) {
      setBgImageUrl(Bg4);
    } else if (screenWidth > 1022 && screenWidth < 1280) {
      setBgImageUrl(Bg2);
    } else {
      setBgImageUrl(Bg);
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 640) {
        setBgImageUrl(Bg3);
      } else if (newScreenWidth > 639 && newScreenWidth < 1023) {
        setBgImageUrl(Bg4);
      } else if (newScreenWidth > 1022 && newScreenWidth < 1280) {
        setBgImageUrl(Bg2);
      } else {
        setBgImageUrl(Bg);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAdmin = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    axios
      .get(
        `https://manthanr.onrender.com/v1/get-user-info/${user.assigned_admin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setAssigned_admin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setuser(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getAdmin();
    getUser();
  }, []);
  const handleReportSubmit = (comment) => {
    //   console.log("Report submitted with comment:", comment);
    // console.log('user is', user);
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://manthanr.onrender.com/v1/send-sos",
        {
          userId: user.userID,
          admin: user.assigned_admin,
          username: user.username,
          message: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          // console.log('data sent');
          if (res.data.message === "Notification sent successfully")
            toast.warn("YOUR ADMIN HAS BEEN WARNED");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.post('')
    setShowReportModal(false);
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col min-h-screen font-montserrat bg-user-btns sm:bg-user-bg-small"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full sm:w-7/12 lg:w-1/2 mr-auto">
          <div className="">
            {/* <div className="flex flex-col flex-wrap justify-between mt-20 sm:mt-36 items-center h-2/5 w-full mx-auto ">
            <div>
              <img
                src={pfp}
                alt="logo"
                className=" ml-2 rounded-full h-10 w-10"
              />
            </div>
              <div className="flex items-center justify-center ">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl text-white sm:text-user-btns-dark font-bold">
                  Hello,{user.username}!
                </h1>
              </div>
              <div className="h-1/6 mb-6 w-5/6 sm:w-4/6 mx-auto">
                <Quotes quotes={quotes} />{" "}
              </div>
            </div> */}

            <div className="sm:mt-36 grid grid-cols-3 grid-rows-2 gap-4 mx-20">
              <div className="row-span-2">
                <div className="flex justify-center">
                  <img
                    src={pfp}
                    alt="Profile"
                    className="ml-2 rounded-full h-32 w-32"
                  />
                </div>
              </div>
              <div className="col-span-2 row-span-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white sm:text-user-btns-dark font-bold">
                  Hello, {user.username}!
                </h1>
                <div>
                  <Quotes quotes={quotes} />
                </div>
              </div>
            </div>

            <div className="sm:hidden mx-auto w-full">
              <img
                src={Img}
                alt="Desc"
                className="w-full sm:h-96 animate-custom-bounce image-small"
              />
            </div>
            <div className="h-3/5 flex flex-wrap justify-around w-11/12 sm:w-10/12 mx-auto rounded-xl mt-6 sm:mt-10">
              <button
                onClick={viewProfileClicked}
                className="btn min-w-32 sm:min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiUser className="icon text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="txt text-sm sm:text-xl font-medium">
                  View Profile
                </div>
              </button>
              <button
                onClick={() => {
                  navigate("/ChatBot");
                }}
                className="btn min-w-32 sm:min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiMessageCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">
                  Start Survey
                </div>
              </button>
              <button
                onClick={handleReportClick}
                className="btn min-w-32 sm:min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiAlertCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">Send SOS</div>
              </button>
              <button
                onClick={adminData}
                className="btn min-w-32 sm:min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <BsInfoCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">
                  Admin Details
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Report Modal */}
      {showReportModal && (
        <ReportMessage
          onClose={handleCloseReportModal}
          onSubmit={handleReportSubmit}
        />
      )}
      {/* Admin Data */}
      {showAdminData && (
        <AdminDetails
          onClose={closeAdminData}
          assigned_admin={assigned_admin}
        />
      )}
      {/* View Profile */}
      {showProfile && <ViewProfile onClose={closeProfile} data={user} />}
    </>
  );
};

export default UserSection;
