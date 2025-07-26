import React, { useState } from 'react';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  const handleRegister = () => {
    let id = `User${users.length + 1}`;
    while (users.find(u => u.id === id)) {
      const lastNum = parseInt(id.replace("User", ""));
      id = `User${lastNum + 1}`;
    }

    const partialId = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = { id, name, address, partialId };
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
      <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full p-2 mb-2 border rounded" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserRegistration;
