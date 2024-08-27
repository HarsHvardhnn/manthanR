import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

const ConsultModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 font-montserrat">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] lg:w-[40%] relative">
        <div className="flex justify-between items-center pb-1 border-b-2">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold">SOS Alert Sent</h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-gray-800"
          >
            <IoClose />
          </button>
        </div>
        <p className="my-4 font-medium text-justify flex gap-x-2">
          <FaBell className="text-yellow-400 text-2xl" />
          SOS sent to the admin. Your concern is being addressed.
        </p>
        <p className="flex items-start whitespace-pre-wrap mb-4 text-sm  font-medium text-justify">
          <FaInfoCircle className=" text-blue-500 text-4xl relative -top-2 sm:top-0 mr-2 " />
          You can also use the 'Consult' button above to schedule a meeting with
          a psychiatrist (mental health expert).
        </p>
      </div>
    </div>
  );
};

export default ConsultModal;
