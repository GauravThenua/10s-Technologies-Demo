import React, { useState } from 'react';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  const handleRegister = () => {
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedAddress) {
      alert("Please enter both name and address.");
      return;
    }

    // Check if user already exists
    const existingUser = users.find(
      (u) =>
        u.name.toLowerCase() === trimmedName.toLowerCase() &&
        u.address.toLowerCase() === trimmedAddress.toLowerCase()
    );

    if (existingUser) {
      alert(`User already registered with ID: ${existingUser.id}`);
      return;
    }

    // Generate unique ID
    let id = `User${users.length + 1}`;
    while (users.find((u) => u.id === id)) {
      const lastNum = parseInt(id.replace('User', ''));
      id = `User${lastNum + 1}`;
    }

    const partialId = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = { id, name: trimmedName, address: trimmedAddress, partialId };
    const updated = [...users, newUser];

    localStorage.setItem('users', JSON.stringify(updated));
    setUsers(updated);

    alert(`Registered as ${id}`);
    setName('');
    setAddress('');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleRegister}
      >
        Register
      </button>

      {/* Display registered users */}
      {/* <div className="mt-6">
        <h3 className="font-semibold mb-2">Registered Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No users registered yet.</p>
        ) : (
          <ul className="list-disc list-inside max-h-40 overflow-auto border p-2 rounded bg-gray-50">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.id}</strong>: {user.name} — {user.address}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default UserRegistration;
