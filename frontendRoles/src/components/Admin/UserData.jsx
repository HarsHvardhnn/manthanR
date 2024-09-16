import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ReportMessage from "./ReportMessage";
import { adminEmailContext } from "../../context";
import jsPDF from "jspdf";
import { ThreeDots } from "react-loader-spinner";
import emailjs from "emailjs-com";
import "jspdf-autotable";
import { FaFilePdf, FaFileCsv } from "react-icons/fa6";
import DialogModal from "./DialogModal";
import { VscDebugRestart } from "react-icons/vsc";
import config from "../../config";
const UserData = ({
  showSOSButton = true,
  showSummaryColumn = false,
  admin,
}) => {
  const apiUrl = config.apiUrl;
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [selectedSort, setSelectedSort] = useState("none");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [fetchedReportedUsers, setFetchedReportedUsers] = useState();
  // const { admin } = useContext(adminContext);
  const { adminEmail } = useContext(adminEmailContext);
  const [selectUser, setSelectUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userToPromote, setUserToPromote] = useState(null);

  const getAllQuestions = async () => {
    const token = localStorage.getItem("adminToken");
    axios
      .get("https://manthanr.onrender.com/v1/getAllData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuestions(res.data);
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

  const sendEmail = async (username, message, adminUsername, adminEmail) => {
    const token = localStorage.getItem("adminToken");
    axios
      .post(
        `${apiUrl}/send-bulk-email`,
        {
          recipients: ["avinashsingh9946@gmail.com"],
          subject: "Urgent: Consultation Request for Student Wellness",
          body: "jgjhgh",
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
          toast.success("User reported");
          const username = users.filter(
            (user) => user.email === selectedUserId
          );
          //console.log(username);
          sendEmail(username, message, admin.username, admin.email);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };

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
        toast.success("User promoted to Admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePromoteClick = (user) => {
    setUserToPromote(user);
    setIsDialogOpen(true);
  };

  const handleConfirmPromotion = () => {
    if (userToPromote) {
      promoteToAdmin(userToPromote._id);
    }
    setUserToPromote(null);
    setIsDialogOpen(false);
  };
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

  const categorizeUser = (score) => {
    if (score === undefined) return "NA";
    else if (score >= 175) return "High";
    else if (score >= 127 && score < 175) return "Moderate";
    else if (score < 127) return "Low";
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (selectedSort === "none") {
      return a.username.localeCompare(b.username);
    } else if (selectedSort === "score_highest") {
      return (b.score || 0) - (a.score || 0);
    } else if (selectedSort === "score_lowest") {
      return (a.score || 0) - (b.score || 0);
    } else if (selectedSort === "alphabetical") {
      return a.username.localeCompare(b.username);
    } else {
      console.warn("Invalid sort option");
      return 0;
    }
  });

  const filteredUsers =
    selectedFilter === "All"
      ? sortedUsers
      : sortedUsers.filter(
          (user) => categorizeUser(user.score) === selectedFilter
        );

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

          return userYear === selectedYear;
        });

  const exportToPDF = (users) => {
    const doc = new jsPDF();
    const data = filteredUsers.map((user) => [
      user.username,
      user.email,
      user.contactNumber || "",
      user.score?.toString(),
      convertISOToDate(user.createdAt),
      categorizeUser(user.score),
    ]);
    const rows = data.map(Object.values);

    doc.autoTable({
      head: [["Username", "Email", "Phone", "Score", "Date", "Category"]],
      body: rows,
    });

    doc.save("User_Data.pdf");
  };

  const exportToCSV = () => {
    const csvRows = [];
    csvRows.push([
      "Username",
      "Email",
      "Phone Number",
      "Score",
      "Date",
      "Category",
    ]);

    filteredByYear.forEach((user) => {
      const row = [
        user.username ?? "NA",
        user.email ?? "NA",
        user.contactNumber ?? "NA",
        user.score ?? "NA",
        convertISOToDateTime(user.createdAt),
        categorizeUser(user.score) ?? "NA",
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "User_Data.csv";
    a.click();
  };

  function convertISOToDateTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US");
  }
  const totalCount = filteredByYear.length;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * usersPerPage;
  const pageCount =
    usersPerPage === "all"
      ? 1
      : Math.ceil(filteredByYear.length / usersPerPage);
  const currentUsers =
    usersPerPage === "all"
      ? filteredByYear
      : filteredByYear.slice(offset, offset + parseInt(usersPerPage));
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleResetFilters = () => {
    setUsersPerPage(10);
    setSelectedSort("none");
    setSelectedFilter("All");
    setSelectedMonth("All");
    setSelectedYear("All");
  };
  return (
    <div className="mx-auto px-2 md:px-4 bg-gray-100 font-montserrat text-xs md:text-sm h-[85%]">
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

          <div className="flex font-medium justify-center mt-4 flex-wrap mx-4 sm:mx-0">
            <div className="flex flex-col md:flex-row mx-1">
              <label htmlFor="count" className="mr-2 ">
                Users per page:
              </label>
              <select
                id="count"
                value={usersPerPage}
                onChange={(e) => setUsersPerPage(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row mx-1">
              <label htmlFor="sort" className="mr-2  ml-4">
                Sort by:
              </label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="none">None</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="score_highest">Score (Highest)</option>
                <option value="score_lowest">Score (Lowest)</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row mx-1">
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
              <div className="flex flex-col md:flex-row md:mt-1 mx-1">
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
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={handleResetFilters}
                title="Reset filters"
                className="ml-4 bg-white text-blue-500 hover:text-blue-600 font-semibold md:font-bold text-2xl py-1 px-2 rounded-md"
              >
                <VscDebugRestart />
              </button>
            </div>
            <div className="mt-2">
              <button
                title="Download CSV File"
                onClick={exportToCSV}
                className="ml-4 bg-white text-blue-500 hover:text-blue-600 font-semibold md:font-bold text-2xl py-1 px-2 rounded-md"
              >
                <FaFileCsv />
              </button>
              <button
                title="Download PDF File"
                onClick={exportToPDF}
                className="ml-4 bg-white text-blue-500 hover:text-blue-600 font-semibold md:font-bold text-2xl py-1 px-2 rounded-md"
              >
                <FaFilePdf />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-160px)]">
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
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Index
                      </th>
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Full Name
                      </th>
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Email
                      </th>
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Phone
                      </th>
                      <th className="px-1 md:px-4 py-1 md:py-2 border">
                        Score
                      </th>
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
                    {currentUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">
                          {capitalizeFirstLetter(user.username) +
                            " " +
                            capitalizeFirstLetter(user.lastname ?? "")}
                        </td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">
                          {user.contactNumber}
                        </td>
                        <td className="px-4 py-2 border">
                          {user.score ?? "NA"}
                        </td>
                        <td className="px-4 py-2 border">
                          {convertISOToDate(user.createdAt)}
                        </td>
                        <td className="px-4 py-2 border">
                          {categorizeUser(user.score)}
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            title="Promote to admin"
                            onClick={() => handlePromoteClick(user)}
                            className="font-medium text-blue-600 mr-2 underline mt-2 xl:mt-0"
                          >
                            Promote
                          </button>
                          <button
                            title="Report to superadmin"
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
                <div className="flex justify-center mt-2">
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    nextLabel="Next >"
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    disabledClassName={"pagination__link--disabled"}
                  />
                </div>
                <DialogModal
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onSubmit={handleConfirmPromotion}
                  paragraph="Are you sure you want to promote this user to admin?"
                  closeBtnText="Cancel"
                  submitBtnText="Promote"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserData;
