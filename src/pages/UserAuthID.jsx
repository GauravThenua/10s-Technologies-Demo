import React, { useState, useEffect } from 'react';

const UserAuthID = () => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  // Auto-generate on mount
  useEffect(() => {
    generateID();
  }, []);

  const generateID = () => {
    const expiry = Date.now() + 8 * 24 * 60 * 60 * 1000; // expiry is 8 days later
    const id = Math.floor(10000 + Math.random() * 90000);
    setData({ id, expiry });
    setShow(false); // hide values after regeneration
  };

  const getFormattedExpiry = (expiry) => {
    const date = new Date(expiry);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-6 text-[#050719]">User Auth ID</h2>

        {data ? (
          <div className="border border-[#dee6ea] rounded-lg p-4">
            <div className="flex flex-col gap-4">
              {/* Expiry Row */}
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Expiry</label>
                <div className="border px-3 py-1 rounded-md w-32 text-center bg-gray-50">
                  {show ? getFormattedExpiry(data.expiry)  : '●●●●●'}
                </div>
              </div>

              {/* ID Row */}
              <div className="flex items-center justify-between">
                <div className="border px-3 py-1 rounded-md w-32 text-center bg-gray-50">
                  {show ? data.id : '●●●●●'}
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setShow(!show)}
                  className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <span className="text-lg font-bold">
                    {show ? '|' : '●'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center mb-4">No ID generated</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
            onClick={generateID}
          >
            Power
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthID;
