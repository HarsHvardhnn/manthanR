import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function AllUsersChart() {
  const [userData, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeader = () => {
    const token = localStorage.getItem("superadminToken");
    if (token) {
      return "Bearer " + token;
    } else {
      return {};
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("superadminToken");
      const response = await axios.get(
        "https://manthanr.onrender.com/v1/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const simplifiedUsers = response.data.map((user) => ({
        username: user.username,
        score: user.score,
        // score: user.score !== undefined ? parseInt(user.score) : undefined,
      }));
      setUsers(simplifiedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const categorizeScores = (score) => {
    if (score === undefined) return "NA";
    else if (score >= 175) return "High";
    else if (score >= 127 && score < 175) return "Moderate";
    else if (score < 127) return "Low";
  };

  const chartData = userData.reduce((acc, user) => {
    const category = categorizeScores(user.score);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const labelOrder = ["Low", "Moderate", "High", "NA"];
  const labels = labelOrder.filter((label) => chartData[label] !== undefined);

  const filteredLabels = labels.filter((label) => chartData[label] !== 0);
  const filteredValues = filteredLabels.map((label) => chartData[label]);

  if (loading) {
    return (
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
    );
  }

  if (labels.length === 0) {
    return <div className="text-red-500 p-2">No data available</div>;
  }

  const getFontSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      return "14px";
    } else if (screenWidth < 640) {
      return "16px";
    } else {
      return "20px";
    }
  };

  const getFontSizeLabel = () => {
    const screenWidth = window.innerWidth;
    return screenWidth < 640 ? "12px" : "16px";
  };

  const colors = labels.map((label) => {
    if (label === "High") return "#4CAF50";
    else if (label === "Moderate") return "#FFD700";
    else if (label === "Low") return "#FF5733";
    else if (label === "NA") return "#7094ff";
    else return "#000000";
  });

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "18px",
        colors: ["#000000"],
        fontFamily: "Montserrat, sans-serif",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Well-Being Level",
        style: {
          fontWeight: "600",
          fontSize: getFontSizeLabel(),
          fontFamily: "Montserrat, sans-serif",
        },
      },
      categories: labels,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Users",
        style: {
          fontWeight: "600",
          fontSize: getFontSizeLabel(),
          fontFamily: "Montserrat, sans-serif",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Montserrat, sans-serif",
        },
      },
      forceNiceScale: true,
    },
    title: {
      text: "WELLNESS SCORE DISTRIBUTION",
      align: "center",
      margin: 26,
      offsetY: 10,
      style: {
        fontSize: getFontSize(),
        fontWeight: "700",
        fontFamily: "Montserrat, sans-serif",
      },
    },
    colors: colors,
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: filteredValues,
    },
  ];

  return (
    <div className="bg-gray-100 border p-6 pb-14 sm:pb-6 rounded-lg border-gray-300 overflow-y-auto h-[90%]">
      <div
        className="w-full sm:w-5/6 mx-auto border border-gray-300 p-1 lg:p-6 rounded-lg"
        style={{ borderRadius: "10px" }}
      >
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
      <div className="mt-4 bg-white p-3 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm sm:text-base">
              <th className="text-left py-1 px-2">Category</th>
              <th className="text-left py-1 px-2">Score Range</th>
              <th className="text-left py-1 px-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            <tr className="border-t">
              <td className="py-1 px-2 text-red-600 font-semibold">Low</td>
              <td className="py-1 px-2">0 - 126</td>
              <td className="py-1 px-2">Well-being score is considered low.</td>
            </tr>
            <tr className="border-t">
              <td className="py-1 px-2 text-yellow-600 font-semibold">
                Moderate
              </td>
              <td className="py-1 px-2">127 - 174</td>
              <td className="py-1 px-2">
                Well-being score is in a moderate range.
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-1 px-2 text-green-600 font-semibold">High</td>
              <td className="py-1 px-2">175 and above</td>
              <td className="py-1 px-2">
                Well-being score is considered high.
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-1 px-2 text-blue-600 font-semibold">NA</td>
              <td className="py-1 px-2">N/A</td>
              <td className="py-1 px-2">No well-being score available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsersChart;
