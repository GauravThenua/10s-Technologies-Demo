import React, { useState, useEffect, useRef } from "react";
import { FiCopy } from "react-icons/fi";

const UserAuthID = () => {
  const [data, setData] = useState(null);
  const [copiedField, setCopiedField] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.title = "User Auth ID";
  }, []);

  const generateID = () => {
    const now = new Date();
    const randomMonth = Math.floor(Math.random() * 12);
    const year = now.getFullYear();
    const lastDate = new Date(year, randomMonth + 1, 0);
    const expiry = lastDate.getTime();
    const id = Math.floor(10000 + Math.random() * 90000);
    setData({ id, expiry });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setData(null);
    }, 120000); // 2 minutes

    setCopiedField("");
  };

  const copyToClipboard = (value, field) => {
    if (value) {
      navigator.clipboard.writeText(value.toString());
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    }
  };

  const getFormattedExpiry = (expiry) => {
    if (!expiry) return "";
    const date = new Date(expiry);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month.toString().padStart(2, "0")}/${day}`;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50 px-0 py-8 relative">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-5 text-[#050719]">
          User Auth ID
        </h2>

        <div className="border border-[#dee6ea] rounded-sm p-10 bg-gray-50 relative">
          <div className="flex flex-col gap-4">
            {/* Identity Number */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-24">
                Identity No.
              </label>
              <div className="relative flex-1">
                <div className="border px-3 py-2 rounded-md w-full bg-white text-gray-800 text-sm text-center">
                  {data ? data.id : ""}
                </div>
                
              </div>
            </div>

            {/* Expiry */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-24">
                Expiry End
              </label>
              <div className="relative flex-1">
                <div className="border px-3 py-2 rounded-md w-full bg-white text-gray-800 text-sm text-center">
                  {data ? getFormattedExpiry(data.expiry) : ""}
                </div>
                
              </div>
            </div>

            {/* Copied message - absolute so it doesn’t push layout */}
            {copiedField && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-xs text-green-600">
                {copiedField === "id"
                  ? "ID Copied!"
                  : copiedField === "expiry"
                  ? "Expiry End Copied!"
                  : "Id + Expiry Copied!"}
              </div>
            )}

            {/* Generate Button - bottom right */}
            <div className="absolute bottom-2 right-2">
              <button
                onClick={generateID}
                className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                title="Generate ID"
              >
                <span className="text-lg font-bold text-gray-700">
                  {data ? "|" : "●"}
                </span>
              </button>
            </div>

            {/* Bulk Copy Button - bottom left */}
            {data && (
              <div className="absolute right-2 bottom-20 ml-2 ">
                <button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify({
                        id: data.id,
                        expiry: getFormattedExpiry(data.expiry),
                      }),
                      "bulk"
                    )
                  }
                  className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  title="Copy All"
                >
                  <FiCopy size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthID;
