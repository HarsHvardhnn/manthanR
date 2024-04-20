import React from "react";

const sampleAdmins = [
  {
    id: 1,
    name: "Admin 1",
    phoneNumber: "123-456-7890",
    email: "admin1@example.com",
  },
  {
    id: 2,
    name: "Admin 2",
    phoneNumber: "456-789-0123",
    email: "admin2@example.com",
  },
  {
    id: 3,
    name: "Admin 3",
    phoneNumber: "789-012-3456",
    email: "admin3@example.com",
  },
];

const AllAdmins = () => {
  const handleDeleteAdmin = (id) => {
    console.log(`Deleting admin with ID: ${id}`);
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
            {sampleAdmins.map((admin, index) => (
              <tr key={admin.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{admin.name}</td>
                <td className="border px-4 py-2">{admin.phoneNumber}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteAdmin(admin.id)}
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
