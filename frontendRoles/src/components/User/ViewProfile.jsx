import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProfile = ({ onClose, loading, getUser, data }) => {
  const navigate = useNavigate();
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center font-montserrat bg-gray-800 bg-opacity-75 z-50"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-[90%] sm:w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase underline">
            Your Profile
          </h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {capitalizeFirstLetter(data?.username) || "NA"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {data?.email || "NA"}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {data?.contactNumber || "NA"}
          </p>
          <p>
            <span className="font-semibold">Degree Type:</span>{" "}
            {data?.degree ? data.degree : "NA"}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {data?.dept ? data.dept : "NA"}
          </p>
          <p>
            <span className="font-semibold">Semester:</span>{" "}
            {data?.semester || "NA"}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/edit-profile", { state: { from: "/usersection" } });
            }}
            className="bg-blue-500 text-white rounded-lg px-4 py-1 mt-2 w-full"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
