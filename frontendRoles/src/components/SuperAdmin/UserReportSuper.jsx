import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import ReportMessage from "../Admin/ReportMessage";
import CommentsComponent from "../Summary";
import { addPreventTab, removePreventTab } from "../User/preventTab";

const UserReport = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportedUser, setReportedUser] = useState(null);
  const [filterByPsy, setFilterByPsy] = useState(false);
  const [comments, setComments] = useState();
  const [sumID, setSumId] = useState("");
  const [userToReport, setUserToReport] = useState({});

  useEffect(() => {
    if (showReportModal || showSummary) {
      addPreventTab();
    } else {
      removePreventTab();
    }
  }, [showReportModal, showSummary]);

  const getUsers = () => {
    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    setLoading(true);
    axios
      .get(`${apiUrl}/get-reported-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserWithInfo(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserInfo = (id) => {
    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/get-user-info/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReportedUser(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reportToPsych = (user) => {
    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .post(
        `${apiUrl}/report-to-psych`,
        {
          userID: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const reportUser = (report, comment) => {
    toast.success("User reported");
    sendEmail(report, comment);
    reportToPsych(report);
  };

  const sendEmail = (report, comment) => {
    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .post(
        `${apiUrl}/send-bulk-email`,
        {
          recipients: ["counselor2@iitp.ac.in"],
          subject:
            "Urgent Request for Immediate Mental Wellness Support for Student",
          body: `
Dear Counselor, 

I hope this message finds you well. I am writing to urgently request immediate support for a student who has been identified as struggling significantly with mental wellness. Given the current situation, it is crucial that this student receives timely therapy and assistance to address their needs effectively. 

Could you please arrange for an initial assessment and therapy sessions as soon as possible? Additionally, if there are any immediate resources or support services available, kindly let us know how we can facilitate access to these. Your prompt attention to this matter would be greatly appreciated. Please feel free to reach out to me directly if you need any more information or if there are additional steps we should take in this situation. 

Student Details: 
Student Name: ${capitalizeFirstLetter(report.username)}${
            report.lastname ? " " + capitalizeFirstLetter(report.lastname) : ""
          }
Student Phone: ${report.contactNumber ? report.contactNumber : "Not available"}
Student Email: ${report.email ? report.email : "Not available"}
SuperAdmin Comments: ${comment}

Thank you very much for your assistance and understanding. 
Best regards, PIC Wellness, IIT Patna
`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };

  const uploadSummary = () => {
    const sum = JSON.stringify(comments);

    const token = localStorage.getItem("superadminToken");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .post(
        `${apiUrl}/upload-summary`,
        {
          userID: sumID,
          summary: sum,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Uploaded summary");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReportUser = (user) => {
    getUserInfo(user.user);
    // setReportedUser(user);
    // console.log(user);
    setShowReportModal(true);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="px-2 sm:px-4 sm:mx-4 h-[85%]">
      {showSummary && (
        <CommentsComponent
          comments={comments}
          setComments={setComments}
          savee={uploadSummary}
          sumID={sumID}
          onClose={() => setShowSummary(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200">
        <h2 className="text-base sm:text-xl md:text-2xl pt-2 font-semibold uppercase">
          User Reports
        </h2>
        <div className="flex items-center space-x-2">
          <label className="text-xs sm:text-sm font-semibold">
            Reported Users:
          </label>
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
      ) : userWithInfo.length === 0 ? (
        <p className=" text-red-500">No data available</p>
      ) : (
        <div className="overflow-y-auto h-[calc(100vh-160px)]">
          {userWithInfo
            .slice()
            .reverse()
            .map(
              (report, index) =>
                (!filterByPsy || report.reported_psych) && (
                  <div
                    key={`${report._id}-${index}`}
                    className={`${
                      report.read ? "bg-gray-200" : "bg-yellow-100"
                    } p-4 rounded-lg shadow mb-4`}
                  >
                    <p className="text-base md:text-lg">
                      <span className="font-semibold">User Name:</span>{" "}
                      {capitalizeFirstLetter(report.username) || "NA"}
                    </p>
                    <p className="text-base md:text-lg">
                      <span className="font-semibold">User Email:</span>{" "}
                      {report.email || "NA"}
                    </p>
                    <p className="text-base md:text-lg">
                      <span className="font-semibold">Contact Number:</span>{" "}
                      {report.contactNumber || "NA"}
                    </p>
                    <p className="text-base md:text-lg">
                      <span className="font-semibold">User Score:</span>{" "}
                      {report?.score === undefined
                        ? "Survey not submitted"
                        : report?.score}
                    </p>
                    {report.message === "reported by super admin directly" ? (
                      <>
                        <p className="text-base md:text-lg font-semibold">
                          Reported by Superadmin
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-base md:text-lg">
                          <span className="font-semibold">Assigned Admin:</span>{" "}
                          {report.admin && report.admin.includes("@")
                            ? report.admin
                            : "No admin allotted"}
                        </p>
                        <p className="text-base md:text-lg">
                          <span className="font-semibold">Admin Comments:</span>{" "}
                          {capitalizeFirstLetter(report.message) || "NA"}
                        </p>
                      </>
                    )}

                    <div className="mt-2 text-sm sm:text-base md:text-lg flex items-center ">
                      <button
                        className={`mr-2 px-3 py-1 rounded ${
                          report.reported_psych
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                        onClick={() => {
                          handleReportUser(report);
                          setUserToReport(report);
                        }}
                        disabled={report.reported_psych}
                      >
                        {report.reported_psych
                          ? "Already Reported"
                          : "Report to Psychiatrist"}
                      </button>
                      <button
                        onClick={() => {
                          setSumId(report?.user);
                          setShowSummary(true);
                        }}
                        className={`mr-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white`}
                      >
                        Summary
                      </button>
                    </div>
                  </div>
                )
            )}
        </div>
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
