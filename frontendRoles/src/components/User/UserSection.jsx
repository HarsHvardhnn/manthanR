import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import Header from "../Home/Header";
import Bg from "./bg3.png";
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

const UserSection = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAdminData, setShowAdminData] = useState(false);
  const {user}=  useContext(userContext);
  const [assigned_admin ,setAssigned_admin]=useState("");
  const [User,setuser]=  useState({});
  const [showProfile, setShowProfile] = useState(false);
  // console.log(user);

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
  }
  const closeProfile = () => {
    setShowProfile(false);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const getAdmin = () => {
    axios.get(`https://manthanr.onrender.com/v1/get-user-info/${user.assigned_admin}`).then((res)=>{
      // console.log(res);
      setAssigned_admin(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

const getUser= ()=>{
  axios.get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`).then((res)=>{
    // console.log(res);
    setuser(res.data);
  }).catch((err)=>{
   toast.error(err.message)
  })
  
}

  useEffect(()=>{
    getAdmin();
    getUser();
  },[]);
  const handleReportSubmit = (comment) => {
  //   console.log("Report submitted with comment:", comment);
  // console.log('user is', user);
     axios.post('https://manthanr.onrender.com/v1/send-sos',{
    userId:user.userID,
    admin:user.assigned_admin,
    username:user.username,
    message:comment
   }).then((res)=>{
    if(res.status===201){
      // console.log('data sent');
    if(res.data.message === 'Notification sent successfully')
     toast.warn('YOUR ADMIN HAS BEEN WARNED') 
  }
   }).catch((err)=>{
    console.log(err);
   })

    // axios.post('')
    setShowReportModal(false);
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col h-screen font-montserrat"
        style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
      >
        <div className="w-1/2 mr-auto">
          <div className="">
            <div className="flex flex-col justify-between mt-36 items-center h-2/5 w-full mx-auto ">
              <div className="flex items-center justify-center ">
                <h1 className="text-6xl text-user-btns-dark font-bold">
                  Hello, User!
                </h1>
              </div>
              <div className="h-1/6 mb-6 w-4/6 mx-auto">
                <Quotes quotes={quotes} />{" "}
              </div>
            </div>
            <div className="h-3/5 flex flex-wrap justify-around w-10/12 mx-auto rounded-xl mt-10">
              <button onClick={viewProfileClicked} className="min-w-60 flex-col items-center w-2/5 mb-4 mx-auto h-32 py-4 px-8  bg-user-btns text-white rounded-xl hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
                <FiUser className="text-6xl mb-2 mx-auto" />
                <div className="text-xl font-medium">View Profile</div>
              </button>
              <button
                onClick={() => {
                  navigate("/ChatBot");
                }}
                className="min-w-60 flex-col items-center w-2/5 mb-4 mx-auto py-4 px-8  h-32 bg-user-btns text-white rounded-xl hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiMessageCircle className="text-6xl mb-2 mx-auto" />
                <div className="text-xl font-medium">Start Survey</div>
              </button>
              <button
                onClick={handleReportClick}
                className="min-w-60 flex-col items-center w-2/5 mb-4 mx-auto py-4 px-8 h-32 bg-user-btns text-white rounded-xl hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <FiAlertCircle className="text-6xl mb-2 mx-auto" />
                <div className="text-xl font-medium">Send SOS</div>
              </button>
              <button
                onClick={adminData}
                className="min-w-60 flex-col items-center w-2/5 mb-4 mx-auto py-4 px-8 h-32 bg-user-btns text-white rounded-xl hover:bg-user-btns-dark hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <BsInfoCircle className="text-6xl mb-2 mx-auto" />
                <div className="text-xl font-medium">Admin Details</div>
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
      {showAdminData && <AdminDetails onClose={closeAdminData} assigned_admin={assigned_admin}/>}
      {/* View Profile */}
      {showProfile && <ViewProfile onClose={closeProfile} data={user}/>}
    </>
  );
};

export default UserSection;
