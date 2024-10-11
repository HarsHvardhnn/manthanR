import React, { useState } from "react";
import { blogData } from "./blogData";
import Header from "../Home/Header";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedBlog(null);
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

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const renderBlogContent = () => {
    if (!selectedBlog) return null;

    return (
      <div className="mt-8 bg-white p-2 md:p-8 rounded shadow-md flex flex-col items-start">
        <button
          className="self-end px-4 py-2 bg-blue-600 text-white mb-4 rounded-3xl hover:underline text-xs sm:text-base"
          onClick={() => setSelectedBlog(null)}
        >
          Back to Blogs
        </button>

        <h2 className="text-2xl md:text-4xl font-bold mb-2">{selectedBlog.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          Category: {selectedBlog.category}
        </p>

        <div className="flex flex-col md:flex-row w-full bg-slate-50 p-2 md:p-6 rounded-md">
          <div
            className="text-gray-800 text-base"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content || "Content not available" } }
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="py-16 lg:py-28 px-4 sm:px-16 font-montserrat min-h-svh sm:min-h-screen bg-blue-50">
        {selectedBlog ? (
          renderBlogContent()
        ) : (
          <>
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
              {selectedBlogs.length > 0 && (
                <div className="col-span-2">
                  <div
                    className="bg-white p-4 rounded shadow-md hover:shadow-xl cursor-pointer"
                    onClick={() => handleBlogClick(selectedBlogs[0])}
                  >
                    <img
                      src={selectedBlogs[0].image}
                      alt={selectedBlogs[0].title}
                      className="w-full lg:h-[80vh] object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedBlogs[0].title || "Untitled Blog"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {selectedBlogs[0].category}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-rows-2 gap-4">
                {selectedBlogs.slice(1, 3).map((blog, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded shadow-md hover:shadow-xl cursor-pointer"
                    onClick={() => handleBlogClick(blog)}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full lg:h-52 object-cover mb-3"
                    />
                    <h3 className="text-lg font-semibold mb-2">
                      {blog.title || "Untitled Blog"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {blog.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {selectedBlogs.slice(3).map((blog, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded shadow-md hover:shadow-xl cursor-pointer"
                  onClick={() => handleBlogClick(blog)}
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
