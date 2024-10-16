import React, { useContext, useState } from "react";
import DialogModal from "./DialogModal";
import { userContext } from "../../context";

const ReportMessage = ({ onClose, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = localStorage.getItem("token");
  const superAdmin = localStorage.getItem("superadminToken");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(comment);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto font-montserrat bg-opacity-75 bg-gray-800">
      <div
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            onClose();
          }
        }}
        className="flex justify-center items-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-11/12 sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex ">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 uppercase underline">
                  Remarks
                </h3>
                <div className="mt-2">
                  <textarea
                    className=" w-full h-56 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 resize-none"
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
            <button
              onClick={() => setIsDialogOpen(true)}
              disabled={!comment.trim()}
              className="w-full inline-flex justify-center disabled:bg-opacity-60 disabled:pointer-events-none rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 outline-none  sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        paragraph={`${
          user
            ? "Send an SOS to the admin?"
            : superAdmin
            ? "Report this user to the Psychiatrist?"
            : "Report this user to the superadmin?"
        } `}
        closeBtnText="Cancel"
        submitBtnText={`${superAdmin ? "Report" : "Send"}`}
      />
    </div>
  );
};

export default ReportMessage;
