import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DialogModal from "../Admin/DialogModal";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [uploadPending, setUploadPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const existingEmail = users.find((user) => user.email === formData.email);

    // if (existingUsername) {
    //   alert("Username already exists. Please choose a different username.");
    //   return;
    // }

    if (existingEmail) {
      toast.error(
        "Email already added. Please enter a different email address."
      );
      return;
    }

    setUsers([
      ...users,
      {
        ...formData,
        password: formData.phone, 
      },
    ]);
    setFormData({
      username: "",
      lastname: "",
      email: "",
      phone: "",
    });
  };

  const handleUploadToDatabase = async () => {
    if (uploadPending) return;
    setUploadPending(true);
    try {
      const usersData = users.map((user) => ({
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        password: user.phone,
      }));
      // console.log(usersData)
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${apiUrl}/add-users`, usersData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        throw new Error("Failed to upload users to database");
      }
      // console.log(response)
      toast.success("Users uploaded to database successfully");
      setUsers([]);
      setUploadPending(false);
    } catch (error) {
      console.error("Error uploading users to database:", error);
      toast.error("Some error occured please check username or email");
      setUploadPending(false);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleEditUser = (index) => {
    const editedUser = users[index];
    setFormData({
      username: editedUser.username,
      lastname: editedUser.lastname,
      email: editedUser.email,
      phone: editedUser.password,
    });
    handleDeleteUser(index);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto bg-gray-100 h-[85%]">
      <div className="w-11/12 xl:w-3/4 mx-auto bg-white rounded text-xs sm:text-sm xl:text-base px-8 pt-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
          Enter User Details
        </h2>
        <form onSubmit={handleAddUser} className="mx-auto">
          <div className="flex">
            <div className="flex-1 mb-4 mr-2">
              <label
                className="block text-gray-700 text-base font-semibold "
                htmlFor="username"
              >
                Firstname
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex-1 ml-2 mb-4">
              <label
                className="block text-gray-700 text-base font-semibold "
                htmlFor="lastname"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold "
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="">
            <label
              className="block text-gray-700 text-base font-semibold "
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-600 text-sm" htmlFor="phone">
              The phone number will be set as the password.
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Add User
            </button>
          </div>
        </form>
        <div className="mt-4">
          <h2 className="text-base uppercase font-semibold mb-2 underline">
            Recently Added
          </h2>
          <div className="overflow-x-auto overflow-y-auto h-[20vh]">
            {users.length === 0 ? (
              <p>No recent additions</p>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 font-semibold">Firstname</th>
                    <th className="px-4 py-2 font-semibold">Lastname</th>
                    <th className="px-4 py-2 font-semibold">Email</th>
                    <th className="px-4 py-2 font-semibold">Password</th>
                    <th className="px-4 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">
                        {user.username}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.lastname}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.email}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.password}
                      </td>
                      <td className="border px-4 py-2 text-center flex justify-center items-center gap-2">
                        <button
                          className="text-blue-500 text-lg font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline md:mr-2"
                          onClick={() => handleEditUser(index)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 text-lg font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleDeleteUser(index)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center py-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            disabled={users.length === 0}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload to Database
          </button>
        </div>
      </div>
      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleUploadToDatabase}
        paragraph="Do you want to add new users?"
        closeBtnText="Cancel"
        submitBtnText="Add"
      />
    </div>
  );
};

export default UserForm;
