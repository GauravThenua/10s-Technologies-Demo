import React, { useState, useEffect } from 'react';

const RelyingParty2 = () => {
  const [input, setInput] = useState({ name: '', id: '', expiry: '' });
  const [submitted, setSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  // Handle submit
  const handleSubmit = () => {
    setSubmitted(true);

    // Set 3-minute timer to auto-reset
    const id = setTimeout(() => {
      reset();
    }, 3 * 60 * 1000); // 3 minutes
    setTimerId(id);
  };

  // Reset data
  const reset = () => {
    setInput({ name: '', id: '', expiry: '' });
    setSubmitted(false);
    if (timerId) clearTimeout(timerId);
  };

  // Keyboard shortcut for Ctrl+R or Cmd+R
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if ((isMac && e.metaKey && e.key === 'r') || (!isMac && e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [timerId]);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Relying Party 2</h2>
      {!submitted ? (
        <>
          <input
            className="w-full p-2 mb-2 border"
            placeholder="Name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <input
            className="w-full p-2 mb-2 border"
            placeholder="ID"
            value={input.id}
            onChange={(e) => setInput({ ...input, id: e.target.value })}
          />
          <input
            className="w-full p-2 mb-2 border"
            placeholder="Expiry"
            value={input.expiry}
            onChange={(e) => setInput({ ...input, expiry: e.target.value })}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            OK
          </button>
        </>
      ) : (
       <>
  <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-2">
    <div>
      <span className="font-semibold text-gray-700">Name:</span>{' '}
      <span className="text-gray-900">{input.name || '-'}</span>
    </div>
    <div>
      <span className="font-semibold text-gray-700">ID:</span>{' '}
      <span className="text-gray-900">{input.id || '-'}</span>
    </div>
    <div>
      <span className="font-semibold text-gray-700">Expiry:</span>{' '}
      <span className="text-gray-900">{input.expiry || '-'}</span>
    </div>
  </div>

  <button
    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded shadow transition duration-200"
    onClick={reset}
  >
    Reset
  </button>
</>

      )}
    </div>
  );
};

export default RelyingParty2;
