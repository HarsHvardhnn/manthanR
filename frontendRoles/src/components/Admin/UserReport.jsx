import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const UserReport = ({ admin }) => {
  // const [reports, setReports] = useState([]);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);
const userWithInfos = {}
  //console.log(admin);

  const getUsers = () => {
    const token = localStorage.getItem("adminToken");
    setLoading(true);

    axios
      .get(
        `https://manthanr.onrender.com/v1/get-admin-reported-users/${admin.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setUserWithInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="px-2 sm:px-4 h-[85%]">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 pt-4 border-gray-200 uppercase ">
        Reported Users
      </h2>
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
      ) :  userWithInfo.length === 0 ? (
        <p className=" text-red-500">No data available</p>
      ) : (
        <div className="overflow-y-auto h-[calc(100vh-160px)]">
          {userWithInfo
            .slice()
            .reverse()
            .map((report, index) => (
              <div
                key={`${report._id}-${index}`}
                className="bg-yellow-100 p-4 rounded-lg shadow mb-4"
              >
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Name:</span>{" "}
                  {capitalizeFirstLetter(report.username)}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {report.email}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Phone:</span>{" "}
                  {report?.contactNumber}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Score:</span>{" "}
                  {report.score || "NA"}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Comments:</span>{" "}
                  {report.message}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserReport;
