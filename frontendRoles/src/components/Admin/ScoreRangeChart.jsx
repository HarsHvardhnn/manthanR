import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ScoreRangeChart() {
  const [userData, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/v1/getAllUsers");
      const simplifiedUsers = response.data.map((user) => ({
        username: user.username,
        score: user.score,
      }));
      setUsers(simplifiedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const categorizeScores = (score) => {
    if (score >= 175) {
      return "High";
    } else if (score >= 127) {
      return "Moderate";
    } else {
      return "Low";
    }
  };

  const chartData = userData.reduce((acc, user) => {
    const category = categorizeScores(user.score);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const labelOrder = ["High", "Moderate", "Low"];
  const labels = labelOrder.filter(label => chartData[label] !== undefined);
  const values = Object.values(chartData);

  const getFontSize = () => {
    const screenWidth = window.innerWidth;
    return screenWidth < 640 ? "17px" : "22px";
  };
  const getFontSizeLabel = () => {
    const screenWidth = window.innerWidth;
    return screenWidth < 640 ? "14px" : "18px";
  };

  const colors = labels.map(label => {
    if (label === "High") return "#4CAF50"; 
    else if (label === "Moderate") return "#FFD700"; 
    else if (label === "Low") return "#FF5733"; 
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
        fontSize: 18,
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
      text: "WELL-BEING DISTRIBUTION",
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
      data: values,
    },
  ];

  return (
    <div className="bg-gray-100 border p-6 rounded-lg border-gray-300">
      <div
        className="w-full sm:w-3/4 mx-auto border border-gray-300 p-1 lg:p-6 rounded-lg"
        style={{ borderRadius: "10px" }}
      >
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
}

export default ScoreRangeChart;
