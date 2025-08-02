import React, { useState, useEffect, useRef } from 'react';

const UserAuthID = () => {
  const [data, setData] = useState(null);
  const timeoutRef = useRef(null);

  const generateID = () => {
    const expiry = Date.now() + 8 * 24 * 60 * 60 * 1000; // 8 days from now
    const id = Math.floor(10000 + Math.random() * 90000);
    setData({ id, expiry });

    // Clear previous timeout (if any) and set a new one for 3 mins
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setData(null);
    }, 120000); // 2 minutes
  };

  const getFormattedExpiry = (expiry) => {
    const date = new Date(expiry);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-6 text-[#050719]">User Auth ID</h2>

        <div className="border border-[#dee6ea] rounded-lg p-4">
          <div className="flex flex-col gap-4">
            {/* Expiry Row */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">Expiry</label>
              <div className="border px-3 py-1 rounded-md w-32 text-center bg-gray-50">
                {data ? getFormattedExpiry(data.expiry) : ''}
              </div>
            </div>

            {/* ID Row */}
            <div className="flex items-center justify-between">
              <div className="border px-3 py-1 rounded-md w-32 text-center bg-gray-50">
                {data ? data.id : ''}
              </div>

              {/* Toggle Button for Generating New */}
              <button
                onClick={generateID}
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <span className="text-lg font-bold">
                  {data ? '|' : '●'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthID;
