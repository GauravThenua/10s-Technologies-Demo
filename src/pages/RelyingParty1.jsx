import React, { useState } from 'react';
import ResetShortcut from '../components/ResetShortcut';

const RelyingParty1 = () => {
  const [input, setInput] = useState({ name: '', id: '', expiry: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const reset = () => {
    setInput({ name: '', id: '', expiry: '' });
    setSubmitted(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <ResetShortcut onReset={reset} />
      <h2 className="text-xl font-bold mb-4">Relying Party 1</h2>
      {!submitted ? (
        <>
          <input className="w-full p-2 mb-2 border" placeholder="Name" value={input.name} onChange={e => setInput({...input, name: e.target.value})} />
          <input className="w-full p-2 mb-2 border" placeholder="ID" value={input.id} onChange={e => setInput({...input, id: e.target.value})} />
          <input className="w-full p-2 mb-2 border" placeholder="Expiry" value={input.expiry} onChange={e => setInput({...input, expiry: e.target.value})} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>OK</button>
        </>
      ) : (
        <>
          <p>Name: {input.name}</p>
          <p>ID: {input.id}</p>
          <p>Expiry: {input.expiry}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default RelyingParty1;
