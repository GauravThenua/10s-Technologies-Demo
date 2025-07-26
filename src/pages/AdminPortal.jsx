import React, { useState } from 'react';

const AdminPortal = () => {
  const [search, setSearch] = useState('');
  const [found, setFound] = useState(null);

  const handleSearch = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find(user => user.partialId === search);
    setFound(match || null);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Portal</h2>
      <input className="w-full p-2 mb-2 border" placeholder="Enter Partial ID" value={search} onChange={e => setSearch(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>Fetch CID</button>
      {found && (
        <div className="mt-4">
          <p>Name: {found.name}</p>
          <p>Address: {found.address}</p>
          <p>User ID: {found.id}</p>
          <p>Partial ID: {found.partialId}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
