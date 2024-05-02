import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as XLSX from "xlsx";
import ReportMessage from "./ReportMessage";
import { adminContext, adminEmailContext, userContext } from "../../context";
import jsPDF from "jspdf";
import { ThreeDots } from "react-loader-spinner";
import emailjs from "emailjs-com";
import "jspdf-autotable";

const UserData = ({
  showSOSButton = true,
  showSummaryColumn = false,
  admin,
}) => {
  // const {user} = useContext(userContext);
  // const [users, setUsers] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("none");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedReportedUsers, setFetchedReportedUsers] = useState();
  // const { admin } = useContext(adminContext);
  const { adminEmail } = useContext(adminEmailContext);

  const [selectUser, setSelectUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);

  // const getHeader = () => {
  //   const token = localStorage.getItem('adminToken');
  //   if (token) {
  //     return 'Bearer ' + token;
  //   } else {
  //     return {};
  //   }
  // };

  const getAllQuestions = async () => {
    const token = localStorage.getItem("adminToken");
    axios
      .get("https://manthanr.onrender.com/v1/getAllData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
        // console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };





  const fetchUsers = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      setLoading(true);
      const response = await axios.get(
        `https://manthanr.onrender.com/v1/user-admin-data/${admin.adminID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      // console.log('users ', users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
    getAllQuestions();
  }, []);

  const submitReport = async (selectedUserId, message, admin) => {
    const token = localStorage.getItem("adminToken");
    axios
      .post(
        "https://manthanr.onrender.com/v1/submit-report",
        {
          admin: admin.email,
          user: selectedUserId,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success("user reported");
          const firstname = users.filter(
            (user) => user.email === selectedUserId
          );
          console.log(firstname)
          sendEmail(firstname[0].firstname, message, firstname[0].email,firstname[0].contactNumber);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("some error occures");
      });
    // console.log(fetchedReportedUsers);
  };

  //  useEffect(() => {
  //   getReportedUsers();
  //  })
  const promoteToAdmin = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.post(
        "https://manthanr.onrender.com/v1/promote-to-admin",
        { user: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("User promoted to admin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const promoteToAdmin = async (id) => {
  //   toast.success("User promoted to admin");
  //   promote
  // };

  const handleReportUser = (id) => {
    setSelectedUserId(id);

    setShowReportModal(true);
  };

  const handleReportSubmit = (comment) => {
    submitReport(selectUser, comment, admin);
    setShowReportModal(false);
  };

  function convertISOToDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const sendEmail = (firstname, message, email,contactNumber) => {
    const serviceId = "service_0jzntyg";
    const templateId = "template_ugy8wsb";
    const userId = "4n-EC2hBnJ4wZnL_F";

    // console.log(firstname,message , 'message');
    // console.log(contactNumber);

    const templateParams = {
      to_name: "PSYCH",
      from_name: "super admin",
      message: message,
      to_email: "abhisektiwari2014@gmail.com",
      firstname: firstname,
      admin: admin.firstname,
      email: email,
      contact:`${contactNumber}`,
      subject: "User Reported",
      message:message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        // console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  // Function to categorize users based on their score
  const categorizeUser = (score) => {
    if (score >= 175) return "High";
    else if (score >= 127 && score < 175) return "Moderate";
    else return "Low";
  };
  // Sorting users based on selected sort
  const sortedUsers = users.sort((a, b) => {
    if (selectedSort === "none") {
      return 0;
    } else if (selectedSort === "score_highest") {
      return b.score - a.score;
    } else {
      return a.score - b.score;
    }
  });

  // Function to filter users based on selected filter
  const filteredUsers =
    selectedFilter === "All"
      ? sortedUsers
      : sortedUsers.filter(
          (user) => categorizeUser(user.score) === selectedFilter
        );

  // Function to filter users based on selected month
  const filteredByMonth =
    selectedMonth === "All"
      ? filteredUsers
      : filteredUsers.filter((user) => {
          const userDateString = user.createdAt;
          const userDate = new Date(userDateString);
          return userDate.getMonth() + 1 === parseInt(selectedMonth, 10);
        });

  const filteredByYear =
    selectedYear === "All"
      ? filteredByMonth
      : filteredByMonth.filter((user) => {
          const userYear = user.createdAt.substring(0, 4); 
          // console.log("User Year:", userYear);
          // console.log("Selected Year:", selectedYear);
          return userYear === selectedYear;
        });

  const exportToPDF = (users) => {
    const doc = new jsPDF();
    const data = filteredUsers.map((user) => [
      user.firstname,
      user.email,
      user.contactNumber || "",
      user.score?.toString(),
      convertISOToDate(user.createdAt),
      categorizeUser(user.score),
    ]);
    const rows = data.map(Object.values);

    // Adjust table headers to match data structure
    doc.autoTable({
      head: [["firstname", "Email", "Phone", "Score", "Date", "Category"]],
      body: rows,
    });

    doc.save("User_Data.pdf");
  };

  const exportToExcel = () => {
    const fileName = "User_Data.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(
      filteredByYear.map((user) => ({
        firstname: user.firstname,
        Email: user.email,
        "Phone Number": user.contactNumber,
        Score: user.score,
        Date: convertISOToDateTime(user.createdAt),
        Category: categorizeUser(user.score),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, fileName);
  };
  function convertISOToDateTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US");
  }
  const totalCount = filteredByYear.length;

  return (
    <div className="mx-auto p-2 md:p-4 pb-10 bg-gray-100 font-montserrat text-xs md:text-sm overflow-y-auto h-[90%]">
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center mt-10 text-lg">
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
        <>
          {showReportModal && (
            <ReportMessage
              onClose={() => setShowReportModal(false)}
              onSubmit={handleReportSubmit}
            />
          )}

          <div className="flex justify-center mt-4 flex-wrap">
            <div className="flex flex-col md:flex-row">
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="none">None</option>
                <option value="score_highest">Score (Highest)</option>
                <option value="score_lowest">Score (Lowest)</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row">
              <label htmlFor="filter" className="ml-4 mr-2">
                Filter by:
              </label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex">
              <div className="flex flex-col md:flex-row md:mt-1">
                <label htmlFor="month" className="ml-4 mr-2">
                  Month:
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
                >
                  <option value="All">All</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:mt-1">
                <label htmlFor="year" className="ml-4 mr-2">
                  Year:
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
                >
                  <option value="All">All</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={exportToExcel}
                className="ml-4 bg-blue-600 text-white font-semibold md:font-bold py-2 px-4 rounded-md"
              >
                Export to Excel
              </button>
              <button
                onClick={exportToPDF}
                className="ml-4 bg-blue-600 text-white font-semibold md:font-bold py-2 px-4 rounded-md"
              >
                Export to pdf
              </button>
            </div>
          </div>

          {filteredByYear.length === 0 || filteredUsers.length === 0 ? (
            <p className="text-center mt-4 text-red-500">
              No data available for the selected filter.
            </p>
          ) : (
            <div className="overflow-y-auto mt-4 h-[90%]">
              <table className="w-full max-w-6xl mx-auto bg-white border rounded-md">
                <thead>
                <tr className="">
                    <td
                      colSpan={8}
                      className="text-lg text-center uppercase mt-2 font-bold"
                    >
                      Total Users: {totalCount}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Index</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Full Name
                    </th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Email</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Phone</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Score</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Date</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Category
                    </th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Actions
                    </th>
                    {showSummaryColumn && (
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Summary
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredByYear.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{user.firstname}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.contactNumber}</td>
                      <td className="px-4 py-2 border">{user.score}</td>
                      <td className="px-4 py-2 border">
                        {convertISOToDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-2 border">
                        {categorizeUser(user.score)}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => promoteToAdmin(user._id)}
                          className="font-medium text-blue-600 mr-2 underline mt-2 xl:mt-0"
                        >
                          Promote
                        </button>
                        <button
                          onClick={() => {
                            setSelectUser(user.email);
                            handleReportUser(user._id);
                          }}
                          className="font-medium text-blue-600 mr-2 underline mt-2 xl:mt-0"
                        >
                          Report
                        </button>
                      </td>
                      {showSummaryColumn && (
                        <td className="px-4 py-2 border">
                          <button className="font-medium text-blue-600 underline">
                            Summary
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserData;
