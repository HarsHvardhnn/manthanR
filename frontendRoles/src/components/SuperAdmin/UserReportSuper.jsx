import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import ReportMessage from "../Admin/ReportMessage";

const UserReport = () => {
  const [reports, setReports] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportedUser, setReportedUser] = useState(null);
  const [filterByPsy, setFilterByPsy] = useState(false); // Add state for filtering by psy report

  // async function fetchUserInformation(userIds) {
  //   const userInformation = [];
  //   const token = localStorage.getItem("superadminToken");
  //   for (const userObj of userIds) {
  //     try {
  //       const userId = userObj.user;

  //       const response = await axios.get(
  //         `https://manthanr.onrender.com/v1/get-user-info/${userId}`,
  //         {  headers: {
  //           Authorization: `Bearer ${token}`}
  //         }
  //       );
  //       const userData = {
  //         ...response.data,
  //         message: userObj.message,
  //       };
  //       userInformation.push(userData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   // console.log(userInformation)
  //   return userInformation;
  // }

  // const getReportedUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("superadminToken");
  //     const response = await axios.get(
  //       "https://manthanr.onrender.com/v1/get-reported-users",
  //       {  headers: {
  //         Authorization: `Bearer ${token}`}
  //       }
  //     );
  //     // console.log(response.data);
  //     setReportedUsers(response.data);

  //     const userInformation = await fetchUserInformation(response.data);

  //     setUserWithInfo(userInformation);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

 const getUsers = () => {
  const token = localStorage.getItem('superadminToken')
  axios.get('https://manthanr.onrender.com/v1/get-user-with-info' ,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then((res)=>{
    console.log(res);
    setUserWithInfo(res.data)
  }).catch((err)=>{
    console.log(err);
  })
 }

  const reportToPsych = (user)=>{
    const token = localStorage.getItem('superadminToken');
    axios.post('/report-to-psych',{
      userID:user._id,
    },{headers:{
      Authorization:`Bearer ${token}`,
    }}).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }


  useEffect(() => {
    getUsers();
  }, []);

  const reportUser = (report) => {
    toast.success("User reported");

    sendEmail(report);
    reportToPsych(report);
  };

  const sendEmail = (report) => {
    const serviceId = "service_0jzntyg";
    const templateId = "template_dbu0gpy";
    const userId = "4n-EC2hBnJ4wZnL_F";

    const { email, message, score, username } = report;

    const templateParams = {
      to_name: "PSYCH",
      from_name: "super admin",
      to_email: "abhisektiwari2014@gmail.com",
      username: username,
      // details:JSON.stringify(newObject),
      subject: "User Reported",
      message: `The user ${username} has been reported.`,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        if (response.status === 200) {
          toast.success("reported user to super admin");
        }
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  const handleReportUser = (user) => {
    setReportedUser(user);
    setShowReportModal(true);
  };

  return (
    <div className="p-4 overflow-y-auto h-[80%]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">User Reports</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-semibold">Filter by Psy Report:</label>
          <input
            type="checkbox"
            checked={filterByPsy}
            onChange={(e) => setFilterByPsy(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
        </div>
      </div>
      {loading ? (
        <div className=" w-full flex flex-col justify-center items-center text-lg">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4299e1"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      ) : (
        userWithInfo.reverse().map(
          (report) =>
            // Check if filterByPsy is true and report is psy report
            (!filterByPsy || report.isPsyReport) && (
              <div
                key={report.id}
                className={`${
                  report.read ? "bg-gray-200" : "bg-yellow-100"
                } p-4 rounded-lg shadow mb-4`}
              >
                {/* Your report content */}
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Name:</span> {report.username}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {report.email}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Contact Number:</span> {report.profile.contactNumber}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Admin:</span>{report.assigned_admin}
                  {/*under this admin*/}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Score:</span> {report.score}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Comments:</span>{" "}
                  {report.message}
                </p>
                <div className="mt-2 text-base md:text-lg">
                  <button
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => {
                      // console.log(report);
                      handleReportUser(report);
                    }}
                  >
                    Report to psy
                  </button>
                </div>
              </div>
            )
        )
      )}
      {showReportModal && (
        <ReportMessage
          onClose={() => setShowReportModal(false)}
          onSubmit={(comment) => {
            reportUser(reportedUser, comment);
            setShowReportModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserReport;
