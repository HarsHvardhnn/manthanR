import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import "../components/User/scrollbar.css"
const CommentsComponent = ({comments,setComments,savee,sumID}) => {
  const [newComment, setNewComment] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);



  const getSummary = () => {
    const token = localStorage.getItem('superadminToken');
    axios.get(`https://manthanr.onrender.com/v1/get-summary/${sumID}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        // Find the actionSummary array within res.data
        const actionSummary = res.data.find(item => Array.isArray(item.actionSummary))?.actionSummary || [];
        setComments(actionSummary);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  

   useEffect(()=>{
    getSummary();
   },[])
  
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const currentTime = new Date();
      const formattedTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");
      const newComments = [
        { id: Date.now(), text: newComment, time: formattedTime },
        ...comments,
      ];
      setComments(newComments);
      setNewComment("");
    }
   
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
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
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col bg-gray-200 bg-opacity-60 p-24">
        
      <div className="flex-1 overflow-y-auto bg-white p-6 w-[70%] mx-auto rounded-lg summary">
        {comments?.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <p className=""><span className="font-medium underline">Comments:</span> {comment.text}</p>
              <p className="text-sm text-gray-500">{comment.time}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingCommentId(comment.id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
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
                    onClick={() => handleEditComment(comment.id, newComment)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="h-20 flex items-center bg-white p-10 w-[70%] mx-auto mt-1 rounded-lg">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddComment}
          // onClick={()=>{
          //   console.log(comments)
          // }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={savee}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CommentsComponent;
