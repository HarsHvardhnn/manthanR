import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileUpdatePage from "../Auth/UpdateProfile";

const ViewProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const sampleUser = {
    name: "John Doe",
    gender: "Male",
    contactNumber: "+1234567890",
    dateOfBirth: "1990-01-01",
    degreeType: "Bachelor",
    department: "Computer Science",
    semester: "5",
    rollNumber: "CS12345",
    hostelName: "ABC Hostel",
    hostelRoomNumber: "101",
    relationshipStatus: "Single",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center font-montserrat bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white w-1/3 p-6 rounded-lg">
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
            <span className="font-semibold">Name:</span> {sampleUser.name}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {sampleUser.gender}
          </p>
          <p>
            <span className="font-semibold">Contact Number:</span>{" "}
            {sampleUser.contactNumber}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {sampleUser.dateOfBirth}
          </p>
          <p>
            <span className="font-semibold">Degree Type:</span>{" "}
            {sampleUser.degreeType}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {sampleUser.department}
          </p>
          <p>
            <span className="font-semibold">Semester:</span>{" "}
            {sampleUser.semester}
          </p>
          <p>
            <span className="font-semibold">Roll Number:</span>{" "}
            {sampleUser.rollNumber}
          </p>
          <p>
            <span className="font-semibold">Hostel Name:</span>{" "}
            {sampleUser.hostelName}
          </p>
          <p>
            <span className="font-semibold">Hostel Room Number:</span>{" "}
            {sampleUser.hostelRoomNumber}
          </p>
          <p>
            <span className="font-semibold">Relationship Status:</span>{" "}
            {sampleUser.relationshipStatus}
          </p>
        </div>
        <div>
          <button onClick={() => {navigate("/ProfileUpdatePage")}} className="bg-blue-500 text-white rounded-lg px-4 py-1 mt-2 w-full">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
