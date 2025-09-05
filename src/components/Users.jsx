import React, { useEffect, useState } from "react";

export default function Users() {
  const [idpData, setIdpData] = useState([]);
  const [users, setUsers] = useState([]);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedIdpData = JSON.parse(localStorage.getItem("idpData")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setIdpData(storedIdpData);
    setUsers(storedUsers);
  }, []);

  // Handle delete
  const handleDelete = (index, type) => {
    if (type === "idpData") {
      const updated = idpData.filter((_, i) => i !== index);
      setIdpData(updated);
      localStorage.setItem("idpData", JSON.stringify(updated));
    } else {
      const updated = users.filter((_, i) => i !== index);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    }
  };

  // Render table dynamically
  const renderTable = (data, type) => {
    if (data.length === 0) {
      return <p className="text-gray-500">No {type} available.</p>;
    }

    const keys = Object.keys(data[0]); 
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-semibold capitalize border-b"
                >
                  {key}
                </th>
              ))}
              <th className="px-4 py-2 text-right text-sm font-semibold border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-b last:border-none"
              >
                {keys.map((key) => (
                  <td key={key} className="px-4 py-2 text-sm text-gray-700">
                    {item[key]}
                  </td>
                ))}
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDelete(index, type)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      {/* Users Data Section (moved above) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Users Data</h1>
        {renderTable(users, "users")}
      </div>

      {/* IDP Data Section (moved below) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">IDP Data</h1>
        {renderTable(idpData, "idpData")}
      </div>
    </div>
  );
}
