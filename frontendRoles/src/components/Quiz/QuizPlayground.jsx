// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import QuizData from "./QuizData";
// import Header from "../Home/Header";

// const BlogDetail = () => {
//   const { quizTitle } = useParams();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const selectedQuiz = QuizData.quizzes.find(
//     (title) => title.name.replace(/\s+/g, "-").toLowerCase() === quizTitle
//   );

//   if (!selectedQuiz) {
//     return <div>Blog not found</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="mt-32 bg-white p-2 lg:px-40 rounded flex flex-col items-start font-montserrat ">
//         <h2 className="text-2xl md:text-4xl font-bold mb-2">
//           {selectedQuiz.name}
//         </h2>
//         <p className="text-sm text-gray-500 mb-2 capitalize">
//           Category: {category}
//         </p>
//         {console.log(selectedBlog)}
//         <div className="flex flex-col md:flex-row w-full bg-blue-50 p-2 lg:p-8 rounded-md">
//           <div
//             className="text-gray-800 text-base"
//             dangerouslySetInnerHTML={{
//               __html: selectedBlog.content || "Content not available",
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogDetail;
