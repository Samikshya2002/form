import React from "react";

const AdminList = ({ admins, selectedAdmin, setSelectedAdmin, handleDeleteAdmin, openAddModal }) => {
  return (
    <div className="w-1/4 border-r p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Admins</h2>
        <button
          onClick={openAddModal}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add
        </button>
      </div>

      {admins.map((admin) => (
        <div key={admin.id} className="flex justify-between items-center mb-2">
          <button
            onClick={() => setSelectedAdmin(admin.email)}
            className={`flex-1 text-left p-2 rounded ${
              selectedAdmin === admin.email ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {admin.first_name} {admin.last_name}
          </button>
          <button
            onClick={() => handleDeleteAdmin(admin.email)}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminList;
