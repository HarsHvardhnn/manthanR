import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import "../components/User/scrollbar.css";
import { FaPlus, FaUpload, FaEdit, FaTrash } from "react-icons/fa";

function LoadingAnimation() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center font-bold">
      <p>Loading{Array(dots).fill(".").join("")}</p>
    </div>
  );
}

const CommentsComponent = ({
  comments,
  setComments,
  savee,
  sumID,
  onClose,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newLowerComment, setNewLowerComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const getSummary = () => {
    const token = localStorage.getItem("superadminToken");
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/get-summary/${sumID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log(res);
        // Find the actionSummary array within res.data
        const actionSummary =
          res.data.find((item) => Array.isArray(item.actionSummary))
            ?.actionSummary || [];
        setComments(actionSummary);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSummary();
  }, []);

  const handleAddComment = () => {
    if (newLowerComment.trim() !== "") {
      const currentTime = new Date();
      const formattedTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");
      const newComments = [
        { id: Date.now(), text: newLowerComment, time: formattedTime },
        ...comments,
      ];
      setComments(newComments);
      setNewLowerComment("");
      setShowNote(true);
    }
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    setShowNote(true);
  };

  const handleEditComment = (id, newText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const editedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        return {
          ...comment,
          text: newText,
          time: `${comment.time} (Edited: ${editedTime})`,
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingCommentId(null);
    setShowNote(true);
  };

  useEffect(() => {
    setNewComment("");
  }, [editingCommentId]);

  return (
    <div className="fixed inset-0 flex flex-col py-40 md:py-28 font-montserrat bg-gray-800 bg-opacity-75 z-50">
      <div className="flex-1  bg-white p-6 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto rounded-t-lg border-b-2 ">
        <div className="flex justify-between items-center mb-2 sm:mx-2 border-b-2 border-gray-200 pb-1">
          <h2 className="text-lg sm:text-xl font-semibold uppercase">
            Add Comments
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto max-h-80 summary">
          {loading ? (
            <LoadingAnimation />
          ) : comments?.length === 0 ? (
            <p>No summary for this user</p>
          ) : (
            comments?.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="bg-yellow-100 p-4 rounded-lg shadow">
                  <p className="">
                    <span className="font-medium">Comments:</span>{" "}
                    {comment.text}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium ">Date Added:</span>{" "}
                    {comment.time}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => setEditingCommentId(comment.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {editingCommentId === comment.id && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Edit comment..."
                        
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() =>
                          handleEditComment(comment.id, newComment)
                        }
                        disabled={!newComment.trim()}
                        className="px-2 py-1 disabled:bg-opacity-60 disabled:pointer-events-none sm:px-4 sm:py-2 mt-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto rounded-b-lg">
        <div className="h-6 flex items-center  py-6 px-2 md:p-8  mt-1 ">
          <input
            type="text"
            value={newLowerComment}
            onChange={(e) => setNewLowerComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-1 sm:p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddComment}
            title="Add message"
            // onClick={()=>{
            //   console.log(comments)
            // }}
            className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg ml-1 sm:ml-2 hover:bg-blue-600"
          >
            <FaPlus />
          </button>
          <button
            onClick={savee}
            title="Update"
            className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg ml-1 sm:ml-2 hover:bg-blue-600"
          >
            <FaUpload />
          </button>
        </div>
        {showNote && (
          <p className=" text-center mb-1 text-xs sm:text-sm text-gray-800">
            Note: After adding, editing, or deleting a comment, click the update
            button to save the changes.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsComponent;
