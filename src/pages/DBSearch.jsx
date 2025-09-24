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

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-xl p-6 mt-10 text-sm font-medium">
      <h2 className="text-center text-pink-600 text-lg font-bold mb-4">
        Identity Provider Database Search
      </h2>

      <label className="block mb-2">Enter Complete ID</label>
      <input
        type="text"
        value={completeId}
        onChange={(e) => setCompleteId(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-400 rounded"
        placeholder="e.g. 4838 2769 8348 0076"
      />

      {[
        { label: "RP Name", key: "rpName" },
        { label: "RP Identity No.", key: "rpId" },
        { label: "End User Partial ID", key: "partialId" },
        { label: "End User Expiry", key: "expiry" },
        { label: "End User Name", key: "userName" },
      ].map(({ label, key }) => (
        <div key={key} className="mb-4">
          <label className="block mb-1">{label}</label>
          <input
            type="text"
            value={details?.[key] || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
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