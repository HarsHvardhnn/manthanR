import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { CgProfile } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";
import Header from "../Home/Header";
import "./scrollbar.css";
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
import useLocalStorage from "../../use-persist-hook";
import ConsultModal from "./ConsultModal";
import { addPreventTab, removePreventTab } from "./preventTab";
const axiosConfig = axios.create({
  baseURL: "http://localhost:3030/v1", // Base URL for API requests
});

const UserSection = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAdminData, setShowAdminData] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [assigned_admin, setAssigned_admin] = useState("");
  // const [storedValue, setStoredValue] = useLocalStorage();
  const [User, setuser] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState("");
  // const [state, setState] = useState(null);
  const [loading, setLoading] = useState();
  const [pfp, setPfp] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [shimmerSize, setShimmerSize] = useState(120);
  const [adminStatus, setAdminStatus] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [consultModal, setConsultModal] = useState(false);
  const [isSosRequestPending, setIsSosRequestPending] = useState(false);
  const [isAdminRequestPending, setIsAdminRequestPending] = useState(false);
  const [isProfileRequestPending, setIsProfileRequestPending] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setShimmerSize(70);
      } else if (screenWidth < 640) {
        setShimmerSize(90);
      } else {
        setShimmerSize(120);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showReportModal || showAdminData || showProfile) {
      addPreventTab();
    } else {
      removePreventTab();
    }
  }, [showReportModal, showAdminData, showProfile]);

  const handleReportClick = () => {
    if (isSosRequestPending) return;

    setIsSosRequestPending(true);

    const token = localStorage.getItem("token");
    setLoading(true);
    setAdminStatus(true);
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.assigned_admin) {
          setShowReportModal(true);
        } else {
          toast.error("SOS cannot be sent: You do not have an assigned admin.");
          setTimeout(() => {
            toast.info(
              "Click 'Admin Details' to check if an admin is available."
            );
          }, 2000);
        }
        setAdminStatus(false);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsSosRequestPending(false);
      });
  };

  const getUserAssignedAdmin = () => {
    axios
      .get("https://manthanr.onrender.com/v1/get-assigned-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setAssigned_admin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assignAdmin = () => {
    axios
      .post(
        "https://manthanr.onrender.com/v1/assign-admin",
        { details: "hi" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((Res) => {
        //console.log(Res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assignWarden = () => {
    axios
      .post(
        "https://manthanr.onrender.com/v1/assign-warden",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((Res) => {
        console.log("warden ", Res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const adminData = () => {
    if (isAdminRequestPending) return;

    setIsAdminRequestPending(true);
    setAdminLoading(true);
    // assignWarden();
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("res", res);
        if (!res.data.assigned_admin) {
          assignAdmin();
          setTimeout(() => {
            axios
              .get(
                `https://manthanr.onrender.com/v1/get-user-info/${user.userID}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((updatedRes) => {
                if (!updatedRes.data.assigned_admin) {
                  setAdminLoading(false);
                  toast.error("Currently, there's no assigned admin to you.");
                } else {
                  getUserAssignedAdmin();
                  setAdminLoading(false);
                  setShowAdminData(true);
                  toast.success("An admin has just been assigned to you.");
                }
              });
          }, 2000);
        } else {
          getUserAssignedAdmin();
          setAdminLoading(false);
          setShowAdminData(true);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsAdminRequestPending(false);
      });
  };
  const closeAdminData = () => {
    setShowAdminData(false);
    setIsAdminRequestPending(false);
  };

  const viewProfileClicked = () => {
    if (isProfileRequestPending) return;
    setIsProfileRequestPending(true);
    getUser();
  };
  const closeProfile = () => {
    setShowProfile(false);
    setIsProfileRequestPending(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }
      setToken(token);

      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      }
    };

    fetchData();
    if (!pfp) {
      getpfp();
      console.log("getpfp called because pfp was null or empty");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [user.userID, pfp]);

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setIsSosRequestPending(false);
  };

  const getpfp = () => {
    const token = localStorage.getItem("token");
    //console.log(user);
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

  const getAdmin = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    setProfileLoading(true);
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setuser(res.data);
        setShowProfile(true);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setProfileLoading(false);
        setIsProfileRequestPending(false);
      });
  };

  const handleReportSubmit = (comment) => {
    //   console.log("Report submitted with comment:", comment);
    // console.log('user is', user);
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://manthanr.onrender.com/v1/send-sos",
        {
          userId: user.userID,
          admin: user.assigned_admin || assigned_admin,
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
            setConsultModal(true);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try to log in again.");
        console.log(err);
      })
      .finally(() => {
        setIsSosRequestPending(false);
      });

    // axios.post('')
    setShowReportModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }

      try {
        const response = await axios.get(
          `https://manthanr.onrender.com/v1/get-user-info/${user.userID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
        setPfp(response.data.profile_pic);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const truncateUsername = (username) => {
    return username.length > 15 ? `${username.substring(0, 10)}...` : username;
  };
  return (
    <>
      <Header />
      <div
        className="flex flex-col min-h-svh sm:min-h-screen font-montserrat bg-user-btns sm:bg-user-bg-small"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full sm:w-7/12 md:w-10/12 lg:w-1/2 mr-auto">
          <div className="">
            <div className="mt-20 sm:mt-36 mb-4 sm:sb-0 grid grid-cols-3 grid-rows-2 gap-0">
              <div className="row-span-2">
                <div className="flex justify-center sm:ml-20 profile">
                  {isLoading ? (
                    <ShimmerCircularImage
                      size={shimmerSize}
                      className="ml-2 rounded-full"
                    />
                  ) : pfp ? (
                    <img
                      src={pfp}
                      alt="Profile"
                      className="ml-2 rounded-full h-[87px] w-[87px] sm:h-32 sm:w-32 shadow-xl"
                      onLoad={() => setIsLoading(false)}
                    />
                  ) : (
                    <div className="ml-2 rounded-full h-[77px] w-[77px] sm:size-28 flex items-center justify-center bg-user-bg-small sm:bg-user-btns sm:text-white text-3xl sm:text-5xl font-bold sm:font-semibold">
                      {user.username ? (
                        user.username.charAt(0).toUpperCase()
                      ) : (
                        <CgProfile />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 row-span-2 txt">
                <h1
                  title={
                    user.username
                      ? capitalizeFirstLetter(user.username)
                      : "Hi, welcome!"
                  }
                  className="name text-xl sm:text-4xl lg:text-4xl lg:w-fit lg:max-w-[140%] mt-2 text-white sm:text-user-btns-dark font-bold"
                >
                  {user.username
                    ? `Hi, ${truncateUsername(
                        capitalizeFirstLetter(user.username)
                      )}`
                    : "Hi, welcome!"}
                </h1>
                <div className="mr-2 sm:mr-32">
                  <Quotes />
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
            <div className="h-3/5 flex flex-wrap justify-around w-11/12 sm:w-10/12 md:w-1/2 lg:w-11/12 md:ml-10 mx-auto lg:mx-auto rounded-xl mt-6 sm:mt-10">
              <button
                onClick={viewProfileClicked}
                disabled={adminLoading || adminStatus}
                className="btn min-w-32 sm:min-w-60 disabled:opacity-90 disabled:scale-100 disabled:hover:bg-user-btns flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiUser className="icon text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">
                  <span className="relative">
                    View Profile{" "}
                    {profileLoading && (
                      <span className="absolute -right-5 sm:-right-6 top-0.5 sm:top-2 text-xl animate-pulse">
                        <HiDotsHorizontal />
                      </span>
                    )}
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  navigate("/disclaimer");
                }}
                disabled={adminLoading || adminStatus || profileLoading}
                className="btn min-w-32 sm:min-w-60 disabled:opacity-90 disabled:scale-100 disabled:hover:bg-user-btns flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiMessageCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">Start Chat</div>
              </button>
              <button
                onClick={handleReportClick}
                disabled={adminLoading || profileLoading}
                className="btn min-w-32 sm:min-w-60 disabled:opacity-90 disabled:scale-100 disabled:hover:bg-user-btns flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiAlertCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium flex items-center justify-center">
                  <span className="relative">
                    Send SOS
                    {adminStatus && (
                      <span className="absolute -right-5 sm:-right-6 top-0.5 sm:top-2 text-xl animate-pulse">
                        <HiDotsHorizontal />
                      </span>
                    )}
                  </span>
                </div>
              </button>
              <button
                onClick={adminData}
                disabled={profileLoading || adminStatus}
                className="btn min-w-32 disabled:opacity-90 disabled:scale-100 disabled:hover:bg-user-btns sm:min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-20 sm:h-32 py-2 sm:py-4 px-2 sm:px-8  bg-user-bg-small sm:bg-user-btns sm:text-white rounded-xl sm:hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <BsInfoCircle className="text-4xl sm:text-6xl mb-2 mx-auto" />
                <div className="text-sm sm:text-xl font-medium">
                  <span className="relative">
                    Admin Details{" "}
                    {adminLoading && (
                      <span className="absolute -right-5 sm:-right-6 top-0.5 sm:top-2 text-xl animate-pulse">
                        <HiDotsHorizontal />
                      </span>
                    )}
                  </span>
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
          loading={loading}
          getAdmin={getAdmin}
          onClose={closeAdminData}
          assigned_admin={assigned_admin}
        />
      )}
      {/* View Profile */}
      {showProfile && (
        <ViewProfile
          loading={loading}
          getUser={getUser}
          onClose={closeProfile}
          data={User}
        />
      )}
      {consultModal && <ConsultModal onClose={() => setConsultModal(false)} />}
    </>
  );
};

export default UserSection;
