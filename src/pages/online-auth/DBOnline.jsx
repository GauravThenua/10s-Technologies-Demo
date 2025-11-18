"use client";

import { useEffect, useState } from "react";

export default function DBSearch() {
  const [completeId, setCompleteId] = useState("");
  const [details, setDetails] = useState(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    document.title = "IDP DB Search";
  }, []);

  const handleFetch = () => {
    if (!completeId.trim()) return alert("Please enter complete ID");

    const stored = JSON.parse(localStorage.getItem('idpData')) || [];
    const result = stored.find((entry) => entry.completeId === completeId.trim());

    if (!result) {
      alert("No data found for this ID.");
      return;
    }

    setDetails(result);
    setShowReset(true);
  };

  const handleReset = () => {
    setCompleteId("");
    setDetails(null);
    setShowReset(false);
  };

  // ✅ Function to color digits (works for both Complete ID and Partial ID)
  const getColoredId = (id, length = 16) => {
    if (!id) return null;
    const first = id.slice(0, 6);
    const middle = id.slice(6, 12);
    const last = id.slice(12, length);
    return (
      <>
        <span className="text-red-500">{first}</span>
        <span className="text-green-500">{middle}</span>
        <span className="text-blue-500">{last}</span>
      </>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-xl p-6 mt-10 text-sm font-medium">
      <h2 className="text-center text-pink-600 text-lg font-bold mb-4">
        Identity Provider Database Search
      </h2>

      <label className="block mb-2">Enter Complete Username</label>
      <div className="relative w-full mb-4">
        <div
          className="absolute inset-0 p-2 border border-gray-400 rounded whitespace-pre overflow-hidden"
          aria-hidden="true"
        >
          {getColoredId(completeId)}
        </div>

        <input
          type="text"
          value={completeId}
          onChange={(e) => setCompleteId(e.target.value)}
          placeholder="e.g. 4838276983480076"
          className="relative w-full p-2 border border-gray-400 rounded bg-transparent text-transparent caret-black"
          style={{ zIndex: 10 }}
        />
      </div>

      {[
        { label: "RP Name", key: "rpName" },
        { label: "RP Identity No.", key: "rpId" },
        { label: "End User Partial Username", key: "partialId" },
        { label: "End User Password", key: "expiry" },
        { label: "End User First Name", key: "userName" },
      ].map(({ label, key }) => (
        <div key={key} className="mb-4">
          <label className="block mb-1">{label}</label>
          {key === "partialId" ? (
            <div className="relative w-full">
              <div
                className="absolute inset-0 p-2 border border-gray-300 rounded whitespace-pre overflow-hidden bg-gray-100"
                aria-hidden="true"
              >
                {getColoredId(details?.[key] || "", 16)}
              </div>
              <input
                type="text"
                value={details?.[key] || ""}
                disabled
                className="relative w-full p-2 border border-gray-300 rounded bg-transparent text-transparent caret-black"
              />
            </div>
          ) : (
            <input
              type="text"
              value={details?.[key] || ""}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          )}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleFetch}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Fetch Details
        </button>

        {showReset && (
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
