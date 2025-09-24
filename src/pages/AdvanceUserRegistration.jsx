import React, { useEffect, useState } from 'react';

const AdvanceUserRegistration = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  useEffect(() => {
    document.title = "Advanced User Registration";
  }, []);

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

    // Generate unique account number (12-digit)
    let accountNumber;
    do {
      accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    } while (users.find((u) => u.accountNumber === accountNumber));

    // Generate unique ID
    let id = `User${users.length + 1}`;
    while (users.find((u) => u.id === id)) {
      const lastNum = parseInt(id.replace('User', ''));
      id = `User${lastNum + 1}`;
    }

    const partialId = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = {
      id,
      accountNumber,
      partialId,
      name: trimmedName,
      address: trimmedAddress,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    alert(`User registered with ID: ${id}`);
    setName('');
    setAddress('');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Advanced User Registration</h2>

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
    </div>
  );
};

export default AdvanceUserRegistration;
