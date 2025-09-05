import React, { useState, useEffect, useRef } from "react";
import { FiCopy } from "react-icons/fi";

const generateBlock = (length = 6) =>
  Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();

const generateBlock2 = (length = 4) =>
  Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();

const AdvanceUserAuthID = () => {
  const [partialId, setPartialId] = useState("");
  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [show, setShow] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [generated, setGenerated] = useState(false); // ✅ NEW: track if already pressed

  const b1TimeoutRef = useRef(null);
  const b2TimeoutRef = useRef(null);

  useEffect(() => {
    document.title = "User Auth ID";
  }, []);

  const getFormattedExpiry = (expiry) => {
    const date = new Date(expiry);
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const copyToClipboard = (value, field) => {
    if (value) {
      navigator.clipboard.writeText(value.toString());
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    }
  };

  const generateID = () => {
    if (generated) return; // ✅ stop if already pressed once

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) return alert("No users found. Register first.");

    const lastUser = users[users.length - 1];
    setPartialId(lastUser.partialId);

    const newB1 = generateBlock();
    const newB2 = generateBlock2();

    const now = new Date();
    const randomMonth = Math.floor(Math.random() * 12);
    const year = now.getFullYear();
    const expiryDate = new Date(year, randomMonth + 1, 0).getTime(); // last day of random month

    setB1(newB1);
    setB2(newB2);
    setExpiry(expiryDate);
    setShow(true);
    setGenerated(false); // ✅ mark as pressed

    // Update localStorage
    const updatedUsers = [...users];
    updatedUsers[users.length - 1] = {
      ...lastUser,
      completeId: `${lastUser.partialId}${newB1}${newB2}`,
      expiry: getFormattedExpiry(expiryDate),
    };
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear any previous intervals
    if (b1TimeoutRef.current) clearInterval(b1TimeoutRef.current);
    if (b2TimeoutRef.current) clearInterval(b2TimeoutRef.current);

    // Refresh B1 every 10 minutes
    b1TimeoutRef.current = setInterval(() => {
      setB1(generateBlock());
    }, 10 * 60 * 1000);

    // Refresh B2 every 3 minutes
    b2TimeoutRef.current = setInterval(() => {
      setB2(generateBlock2());
    }, 3 * 60 * 1000);
  };

  useEffect(() => {
    return () => {
      if (b1TimeoutRef.current) clearInterval(b1TimeoutRef.current);
      if (b2TimeoutRef.current) clearInterval(b2TimeoutRef.current);
    };
  }, []);

  return (
  <div className="flex items-center justify-center bg-gray-50 px-0 py-13 min-h-[60vh] relative">
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
      <h2 className="text-xl font-bold text-center mb-5 text-[#050719]">
        User Auth ID
      </h2>

      <div className="border border-[#dee6ea] rounded-sm p-8 bg-gray-50 relative">
        <div className="flex flex-col gap-4">
          {/* Full ID display */}
          <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
            <label className="text-sm font-medium text-gray-700 w-24 max-sm:w-full">
              Identity No.
            </label>
            <div className="relative flex-1 w-full">
              <div className="border w-[180px] max-sm:w-full px-2 py-2 rounded-md bg-white text-gray-800 text-sm text-center">
                {show && (
                  <>
                    <span className="text-red-600">{partialId} </span>
                    <span className="text-green-600">{b1} </span>
                    <span className="text-blue-600">****</span>
                  </>
                )}
              </div>

              {/* Copy button */}
              {show && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify({
                        id: `${partialId}${b1}****`,
                        expiry: getFormattedExpiry(expiry),
                      }),
                      "bulk"
                    )
                  }
                  className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition max-sm:right-2 max-sm:top-[110%] max-sm:translate-y-0"
                  title="Copy ID + Expiry"
                >
                  <FiCopy size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Expiry */}
          <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
            <label className="text-sm font-medium text-gray-700 w-24 max-sm:w-full">
              Expiry End
            </label>
            <div className="relative flex-1 w-full">
              <div className="border px-3 py-2 rounded-md w-[180px] max-sm:w-full bg-white text-gray-800 text-sm text-center">
                {show ? getFormattedExpiry(expiry) : ""}
              </div>
            </div>
          </div>

          {/* Copied message */}
          {copiedField && (
            <div className="text-xs text-green-600 text-center -mt-2">
              {copiedField === "id"
                ? "ID Copied!"
                : copiedField === "expiry"
                ? "Expiry End Copied!"
                : "ID + Expiry Copied!"}
            </div>
          )}

          {/* Generate Button */}
          <div className="absolute bottom-2 right-2 max-sm:static max-sm:mt-4 flex justify-end">
            <button
              onClick={generateID}
              className={`w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center transition ${
                generated
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              title="Generate ID"
            >
              <span className="text-lg font-bold text-gray-700">
                {show ? "|" : "●"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute left-1 sm:left-10 bottom-[-11px] bg-white/80 border border-gray-300 rounded-md p-1 text-[10px] leading-3 shadow-sm max-sm:static max-sm:mt-6 max-sm:w-full">
        <div className="text-red-400 font-bold">
          <span>Red</span>: Partial Identifier. Remains static for entire
          lifetime of identity
        </div>
        <div className="text-green-400 font-bold">
          <span>Green</span>: B1 Block – changes every 10 min in demo (Prod
          will differ)
        </div>
        <div className="text-blue-400 font-bold">
          <span>Blue</span>: B2 Block – changes every 3 min in demo (Prod will
          differ)
        </div>
      </div>
    </div>
  </div>
);

};

export default AdvanceUserAuthID;
