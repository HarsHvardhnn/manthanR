import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import DialogModal from "../Admin/DialogModal";

const AllAdmins = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // async function fetchUserInformation(userIds) {
  //   const userInformation = [];

  //   for (const userObj of userIds) {
  //     try {
  //       const userId = userObj.user;

  //       const response = await axios.get(
  //         `https://manthanr.onrender.com/v1/get-user-info/${userId}`
  //       );
  //       const userData = {
  //         ...response.data,
  //         message: userObj.message
  //       };
  //       userInformation.push(userData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   return userInformation;
  // }

  const getHeader = () => {
    const token = localStorage.getItem("superadminToken");
    if (token) {
      return "Bearer " + token;
    } else {
      return {};
    }
  };

  const getAllAdmins = () => {
    setLoading(true);
    const token = localStorage.getItem("superadminToken");
    axios
      .get("https://manthanr.onrender.com/v1/getAllAdmins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        //console.log(res.data);
      })
      .catch((Err) => {
        console.log(Err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  // const getData = (selectedAdmin) => {
  //   console.log(selectedAdmin);
  //   axios.post('https://manthanr.onrender.com/v1/getAdminWiseData', { admin: selectedAdmin })
  //     .then(async (res) => {
  //       console.log('response',res.data);
  //       // const userIds = res.data.map(user => ({ user: user.userId, message: user.message }));
  //       const userInformation = await fetchUserInformation(res.data);
  //       console.log("User Information:", userInformation);
  //       setUserData(userInformation)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false); // Set loading to false regardless of success or failure
  //     });
  // }

  // useEffect(() =>{
  //   setLoading(true);
  //   getData(admin)},[admin])

  const handleDeleteAdmin = (id) => {
    const token = localStorage.getItem("superadminToken");
    axios
      .delete(`https://manthanr.onrender.com/v1/delete-admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
        getAllAdmins();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (adminToDelete) {
      handleDeleteAdmin(adminToDelete._id);
    }
    setIsDialogOpen(false);
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="bg-gray-100 h-[85%]">
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center mt-10 text-lg">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4299e1"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="max-w-6xl text-xs sm:text-sm mx-auto bg-white p-6 h-full shadow-md">
          <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
            All Admins
          </h2>
          {userData.length === 0 ? (
            <p className=" text-red-500">No data available</p>
          ) : (
            <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-200px)]">
              <table className="mt-2 table-auto w-full text-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 border py-2">#</th>
                    <th className="px-4 border py-2">Name</th>
                    <th className="px-4 border py-2">Phone</th>
                    <th className="px-4 border py-2">Email</th>
                    <th className="px-4 border py-2">Degree</th>
                    <th className="px-4 border py-2">Department</th>
                    <th className="px-4 border py-2">Semester</th>
                    <th className="px-4 border py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {userData.map((admin, index) => (
                    <tr key={admin._id}>
                      <td className="border font-semibold px-4 py-2">
                        {index + 1}.
                      </td>
                      <td className="border px-4 py-2">
                        {capitalizeFirstLetter(admin.username) || "NA"}
                      </td>
                      <td className="border px-4 py-2">
                        {admin.contactNumber || "NA"}
                      </td>
                      <td className="border px-4 py-2">
                        {admin.email || "NA"}
                      </td>
                      <td className="border px-4 py-2">
                        {admin.degree || "NA"}
                      </td>
                      <td className="border px-4 py-2">{admin.dept || "NA"}</td>
                      <td className="border px-4 py-2">
                        {admin.semester || "NA"}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          title="Delete Admin"
                          className="text-red-600 text-xl flex items-center mx-auto"
                          onClick={() => handleDeleteClick(admin)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDeleteConfirmation}
        paragraph="Do you want to delete this admin?"
        closeBtnText="Cancel"
        submitBtnText="Delete"
      />
    </div>
  );
};

export default AllAdmins;
