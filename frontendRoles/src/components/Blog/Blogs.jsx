import React, { useState } from "react";
import { blogData } from "./blogData";
import Header from "../Home/Header";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getAllBlogs = () => {
    return blogData.reduce((allblogs, categoryData) => {
      return allblogs.concat(categoryData.blogs);
    }, []);
  };

  const selectedBlogs =
    selectedCategory === "all"
      ? getAllBlogs()
      : blogData.find(
          (categoryData) => categoryData.category === selectedCategory
        )?.blogs || [];

  return (
    <>
      <Header />
      <div className="py-28 px-4 sm:px-16 font-montserrat bg-blue-50">
        
        <div className="flex flex-wrap justify-center my-8 gap-y-4">
          <button
            key="all"
            className={`mx-2 px-6 py-2 rounded-full ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white border-white"
                : "border border-black"
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          {blogData.map((categoryData, index) => (
            <button
              key={index}
              className={`mx-2 px-6 py-2 rounded-full ${
                selectedCategory === categoryData.category
                  ? "bg-blue-600 text-white border-white"
                  : "border border-black"
              }`}
              onClick={() => handleCategoryClick(categoryData.category)}
            >
              {categoryData.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedBlogs.length > 0 && (
            <div className="col-span-2">
              <div className="bg-white p-4 rounded shadow-md hover:shadow-xl">
                <img
                  src={selectedBlogs[0].image}
                  alt={selectedBlogs[0].title}
                  className="w-full h-[80vh] object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">
                  {selectedBlogs[0].title}
                </h3>
              </div>
            </div>
          )}
          <div className="grid grid-rows-2 gap-4">
            {selectedBlogs.slice(1, 3).map((blog, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded shadow-md hover:shadow-xl"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">{blog.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {selectedBlogs.slice(3).map((blog, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow-md hover:shadow-xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{blog.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
