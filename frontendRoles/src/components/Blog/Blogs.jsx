import React, { useState } from "react";
import { blogData } from "./blogData";
import Header from "../Home/Header";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getAllBlogs = () => {
    return blogData.reduce((allblogs, categoryData) => {
      const blogsWithCategory = categoryData.blogs.map((blog) => ({
        ...blog,
        category: categoryData.category,
      }));
      return allblogs.concat(blogsWithCategory);
    }, []);
  };

  const selectedBlogs =
    selectedCategory === "all"
      ? getAllBlogs()
      : blogData
          .find((categoryData) => categoryData.category === selectedCategory)
          ?.blogs.map((blog) => ({
            ...blog,
            category: selectedCategory,
          })) || [];

  return (
    <>
      <Header />
      <div className="py-16 lg:py-28 px-4 sm:px-16 font-montserrat min-h-svh sm:min-h-screen bg-blue-50">
        <div className="flex flex-wrap justify-center my-8 gap-y-2 text-xs sm:text-base">
          <button
            key="all"
            className={`mx-2 px-6 py-2 rounded-full font-medium ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white border-white"
                : "border border-gray-600 text-gray-600"
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          {blogData.map((categoryData, index) => (
            <button
              key={index}
              className={`mx-2 px-6 py-2 rounded-full font-medium ${
                selectedCategory === categoryData.category
                  ? "bg-blue-600 text-white border-white"
                  : "border border-gray-600 text-gray-600"
              }`}
              onClick={() => handleCategoryClick(categoryData.category)}
            >
              {categoryData.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedBlogs.map((blog, idx) => (
            <Link
              key={idx}
              to={`/blogs/${blog.category.replace(/\s+/g, "-").toLowerCase()}/${blog.title.replace(/\s+/g, "-").toLowerCase()}`}
              className="bg-white p-4 rounded shadow-md hover:shadow-xl cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">
                {blog.title || "Untitled Blog"}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {blog.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
