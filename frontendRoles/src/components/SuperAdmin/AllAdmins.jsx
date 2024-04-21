import React,{useEffect,useState} from "react";

import axios from "axios";

const AllAdmins = () => {

 const [loading,setLoading]= useState(false);

  const [userData , setUserData] = useState([]);
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

  const getAllAdmins = () => {
    axios
      .get("https://manthanr.onrender.com/v1/getAllAdmins")
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  useEffect(()=>{
    getAllAdmins();
  },[]);
  
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
    // console.log(`Deleting admin with ID: ${id}`);
  };

  return (
    <div className="bg-gray-100 h-[90%]">
      <div className="max-w-6xl mx-auto bg-white px-4 py-10 overflow-y-auto h-[90%] ">
        <table className="mt-2 table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userData.map((admin, index) => (
              <tr key={admin._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{admin.username}</td>
                <td className="border px-4 py-2">{admin.conatctNumber}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteAdmin(admin._id)}
                  >
                    Remove Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdmins;
