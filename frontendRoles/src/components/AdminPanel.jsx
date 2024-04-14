// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminPanel = () => {

//   const [selectedFilter, setSelectedFilter] = useState("score"); 
//   const promoteToAdmin = async (id) => {
//     axios
//     .post("http://localhost:4000/v1/promote-to-admin", { user: id })
//       .then((res) => {
//         // console.log(res);
//         if (res.status === 200) {
//           toast.success("User promoted to admin");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };


//   const reportUser = (id) => {
//     console.log("reported user with", id);
//   };


//   const matchedData = users.map((user) => {
//     const userAnswers = questions.filter((item) => item.user === user._id);
//     return {
//       ...user,
//       userAnswers,
//     };
//   });
//   // const searchedUsers = matchedData.filter((user) =>
//   //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   // );


//   const filteredUsers = matchedData.sort((a, b) => {
//     if (selectedFilter === "score_highest") {
//       return b.score - a.score; 
//     } else if (selectedFilter === "score_lowest") {
//       return a.score - b.score; 
//     } else {
//       return b.score - a.score;
//     }
//   });
//   return (
//     <div className=" mx-auto p-4 pb-10 bg-blue-50 font-montserrat">
//       <h2 className="text-3xl font-bold mb-4 text-center p-5 uppercase">User Scores</h2>
//       <div className="w-10/12 mx-auto mb-20 flex justify-between mt-8">
//         {/* <div className="w-5/12 mx-4">
//           <ChartOne />
//         </div>
//         <div className="w-5/12 mx-4">
//           <ChartTwo/>
//         </div> */}
//       </div>
//       <div className="flex justify-center mt-4">
//         <label htmlFor="filter" className="mr-2">
//           Filter by:
//         </label>
//         <select
//           id="filter"
//           value={selectedFilter}
//           onChange={(e) => setSelectedFilter(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
//         >
//           <option value="score_highest">Score (Highest)</option>
//           <option value="score_lowest">Score (Lowest)</option>
//           {/* Add more filter options here */}
//         </select>
//       </div>
//       <div className="flex flex-wrap mx-auto w-10/12 justify-center bg-blue-200 border p-6 rounded-lg border-gray-300 mt-4">
//         {filteredUsers.map((user) => (
//           <div
//             key={user._id}
//             className="border border-gray-400 p-4 rounded-md shadow-md w-3/12 mt-4 mx-4 bg-blue-200"
//           >
//             <div className="text-center">
//               <p className="font-bold">{user.username}</p>
//               <div className="flex justify-between font-medium mt-4">
//                 <p>Score: {user.score}</p>
//                 <p>Answered: {user.userAnswers.length}</p> {/* Corrected */}
//               </div>
//             </div>
//             <div className="flex-col justify-between mt-2 font-medium">
//               <button
//                 onClick={() => {
//                   promoteToAdmin(user._id);
//                 }}
//                 className="w-full bg-blue-400 m-1 py-2 px-4 rounded-md mx-auto"
//               >
//                 Promote to Admin
//               </button>
//               <button
//                 onClick={() => {
//                   reportUser(user._id);
//                 }}
//                 className="w-full bg-blue-400 m-1 py-2 px-4 rounded-md mx-auto"
//               >
//                 Report to Admin
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8">
//         <button
//           className="w-2/6 bg-blue-400 font-bold py-2 px-6 rounded-md"
//           onClick={() => {
//             console.log(matchedData);
//           }}
//         >
//           Notify Super Admin
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
