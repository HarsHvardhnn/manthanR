import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
function AdminWiseChart({ admin }) {
  const [loading, setLoading] = useState(true);
  
  const getHeader = () => {
    const token = localStorage.getItem('superadminToken');
    if (token) {
      return 'Bearer ' + token;
    } else {
      return {}; 
    }
  };
  const [userData , setUserData] = useState([]);
  async function fetchUserInformation(userIds) {
    const userInformation = [];
  
    for (const userObj of userIds) {
      try {
        const userId = userObj.user;
  
        const response = await axios.get(
          `https://manthanr.onrender.com/v1/get-user-info/${userId}`, {headers:getHeader()}
        );
        const userData = {
          ...response.data,
          message: userObj.message 
        };
        userInformation.push(userData);
      } catch (error) {
        console.error(error);
      }
    }
  
    return userInformation;
  }
  
  const getData = (selectedAdmin) => {
    // console.log(selectedAdmin);
    axios.post('https://manthanr.onrender.com/v1/getAdminWiseData', { admin: selectedAdmin })
      .then(async (res) => {
        // console.log('response',res.data);
        // const userIds = res.data.map(user => ({ user: user.userId, message: user.message }));
        const userInformation = await fetchUserInformation(res.data);
        // console.log("User Information:", userInformation);
        setUserData(userInformation)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }
  

  useEffect(() =>{
    setLoading(true);
    getData(admin);
  },[admin])
  // useEffect(() => { 
  //   const fetchData = async () => {
  //     // Simulated fetching delay for demonstration
  //     await new Promise(resolve => setTimeout(resolve, 1000));
 

  //     const selectedAdminData = hardcodedUserData.find(data => data.adminName === admin);
  //     if (selectedAdminData) {
  //       setUserData(selectedAdminData.users);
  //     } else {
  //       setUserData([]);
  //     }
  //   };

  //   fetchData();
  // }, [admin]);

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
  const colors = labels.map(label => {
    if (label === "High") return "#4CAF50"; 
    else if (label === "Moderate") return "#FFD700"; 
    else if (label === "Low") return "#FF5733"; 
    else return "#000000"; 
  });

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
        text: "Well-being Level",
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
      data: values,
    },
  ];

  return (
    <div className="bg-gray-100 border p-6 rounded-lg border-gray-300">
      <div
        className="w-full sm:w-5/6 mx-auto border border-gray-300 p-1 lg:p-6 rounded-lg"
        style={{ borderRadius: "10px" }}
      >
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
}

export default AdminWiseChart;