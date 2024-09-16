import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function ScoreRangeChart({ admin }) {
  const [userData, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(
        `${apiUrl}/user-admin-data/${admin.adminID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const simplifiedUsers = response.data.map((user) => ({
        username: user.username,
        score: user.score,
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
  }, [admin.adminID]);

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
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Users",
      data: filteredValues,
    },
  ];

  return (
    <div className="bg-gray-100 border p-6 pb-14 rounded-lg border-gray-300 overflow-y-auto h-[90%]">
      <div
        className="w-full sm:w-5/6 mx-auto border border-gray-300 p-1 lg:p-6 rounded-lg"
        style={{ borderRadius: "10px" }}
      >
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
      <div className="mt-4 bg-white rounded-lg p-1 shadow-md lg:w-[80%] mx-auto">
        <div className="flex flex-col sm:flex-row gap-1 ">
          <div className="flex-1 ">
            <div className="flex items-center justify-center p-2 sm:p-4 rounded-lg text-red-600 font-semibold">
              <span className="text-sm sm:text-base font-bold">
                Low: 0 - 126
              </span>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex text-yellow-400 font-semibold justify-center p-2 sm:p-4 rounded-lg items-center">
              <span className="text-sm sm:text-base font-bold">
                Moderate: 127 - 174
              </span>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex text-green-600 font-semibold justify-center p-2 sm:p-4 rounded-lg items-center">
              <span className="text-sm sm:text-base font-bold">
                High: 175 and above
              </span>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex text-blue-600 font-semibold  justify-center p-2 sm:p-4 rounded-lg items-center">
              <span className="text-sm sm:text-base font-bold">
                NA: No Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreRangeChart;
