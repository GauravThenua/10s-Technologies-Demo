import React, { useEffect, useState } from 'react';

const AdvanceUserRegistration = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  useEffect(() => {
    document.title = "End User Registration";
  }, []);

  const handleRegister = () => {
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedAddress) {
      alert("Please enter both name and address.");
      return;
    }

    // Check if user already exists
    const existingIndex = users.findIndex(
      (u) =>
        u.name.toLowerCase() === trimmedName.toLowerCase() &&
        u.address.toLowerCase() === trimmedAddress.toLowerCase()
    );

    if (existingIndex !== -1) {
      const existingUserId = `User${existingIndex + 1}`;
      alert(`User already registered with User ID: ${existingUserId}`);
      return;
    }

    // Generate unique account number (12-digit)
    let accountNumber;
    do {
      accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    } while (users.find((u) => u.accountNumber === accountNumber));

    // Generate partial identifier (6-digit)
    const partialId = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = {
      accountNumber,
      partialId,
      name: trimmedName,
      address: trimmedAddress,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    const newUserId = `User${updatedUsers.length}`;
    alert(`User registered: ${newUserId}`);
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
          <ul className="list-disc list-inside max-h-40 overflow-auto border p-2 rounded bg-gray-50 text-sm">
            {users.map((user, index) => (
              <li key={index}>
                <strong>User ID:</strong> User{index + 1} <br />
                <strong>Account #:</strong> {user.accountNumber} <br />
                <strong>Partial ID:</strong> {user.partialId} <br />
                <strong>Name:</strong> {user.name} <br />
                <strong>Address:</strong> {user.address}
                <hr className="my-2" />
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default AdvanceUserRegistration;
