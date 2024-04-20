import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import ReportMessage from "./ReportMessage";

const UserReport = () => {
  const [reports, setReports] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false); // State to manage showing the ReportMessage component
  const [reportedUser, setReportedUser] = useState(null);

  async function fetchUserInformation(userIds) {
    const userInformation = [];

    for (const userObj of userIds) {
      try {
        const userId = userObj.user;

        const response = await axios.get(
          `https://manthanr.onrender.com/v1/get-user-info/${userId}`
        );
        const userData = {
          ...response.data,
          message: userObj.message,
        };
        userInformation.push(userData);
      } catch (error) {
        console.error(error);
      }
    }

    return userInformation;
  }

  const getReportedUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://manthanr.onrender.com/v1/get-reported-users"
      );
      console.log(response.data);
      setReportedUsers(response.data);

      const userInformation = await fetchUserInformation(response.data);

      console.log(userInformation);
      setUserWithInfo(userInformation);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportedUsers();
  }, []);

  const markAsRead = (reportId) => {
    console.log("Mark as Read clicked for report ID:", reportId);
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, read: true } : report
      )
    );
  };

  const reportUser = (report) => {
    toast.success("User reported");

    sendEmail(report);
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

  const markAsUnread = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, read: false } : report
      )
    );
  };
  const handleReportUser = (user) => {
    setReportedUser(user);
    setShowReportModal(true);
  };
  return (
    <div className="p-4 overflow-y-auto h-[80%]">
      <h2 className="text-lg md:text-xl font-semibold mb-4">User Reports</h2>
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
        userWithInfo.map((report) => (
          <div
            key={report.id}
            className={`${
              report.read ? "bg-gray-200" : "bg-yellow-100"
            } p-4 rounded-lg shadow mb-4`}
          >
            <p className="text-base md:text-lg">
              <span className="font-semibold">Name:</span> {report.username}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span>
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Phone:</span>
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Admin:</span>{" "}
              {/*under this admin*/}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Score:</span> {report.score}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Comments:</span> {report.message}
            </p>
            <div className="mt-2 text-base md:text-lg">
              {!report.read && (
                <button
                  onClick={() => markAsRead(report.id)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Mark as Read
                </button>
              )}
              <button
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  // console.log(report);
                  handleReportUser(report);
                }}
              >
                Report to psy
              </button>
              {report.read && (
                <button
                  onClick={() => markAsUnread(report.id)}
                  className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Mark as Unread
                </button>
              )}
            </div>
          </div>
        ))
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
