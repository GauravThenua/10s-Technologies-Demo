import React, { useEffect, useState } from "react";

export default function Users() {
  const [idpData, setIdpData] = useState([]);
  const [users, setUsers] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedIdpData = JSON.parse(localStorage.getItem("idpData")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Clean users: keep only valid objects
    const cleanedUsers = storedUsers.filter(
      (u) => u.id && u.partialId && u.name && u.address
    );

    setIdpData(storedIdpData);
    setUsers(cleanedUsers);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("idpData", JSON.stringify(idpData));
  }, [idpData]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ✅ Improved delete handler — deletes only clicked row or identical duplicates
  const handleDelete = (itemToDelete, type) => {
    const compareObjects = (a, b) =>
      Object.keys(a).every((key) => a[key] === b[key]);

    if (type === "users") {
      const updatedUsers = users.filter((user) => !compareObjects(user, itemToDelete));
      setUsers(updatedUsers);
    } else if (type === "idpData") {
      const updatedIdpData = idpData.filter((item) => !compareObjects(item, itemToDelete));
      setIdpData(updatedIdpData);
    }
  };

  // Table renderer
  const renderTable = (data, type) => {
    if (data.length === 0) {
      return <p className="text-gray-500">No {type} available.</p>;
    }

    const keys = Array.from(new Set(data.flatMap(Object.keys)));

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
            {data.map((item) => (
              <tr
                key={item.id || Math.random()}
                className="hover:bg-gray-50 transition-colors border-b last:border-none"
              >
                {keys.map((key) => (
                  <td key={key} className="px-4 py-2 text-sm text-gray-700">
                    {item[key] !== undefined ? item[key] : "-"}
                  </td>
                ))}
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDelete(item, type)} // ✅ pass entire item, not just id
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
      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Users Data</h1>
        {renderTable(users, "users")}
      </div>

      {/* IDP Data Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">IDP Data</h1>
        {renderTable(idpData, "idpData")}
      </div>
    </div>
  );
}
