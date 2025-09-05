import React, { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";

const MITMScenario = () => {
  const [rpName, setRpName] = useState("");
  const [rpId, setRpId] = useState("");
  const [userDetails, setUserDetails] = useState({
    partialId: "",
    expiry: "",
    completeId: "",
    userName: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Reset handler
  const resetData = () => {
    setUserDetails({ partialId: "", expiry: "", completeId: "", userName: "" });
    setRpName("");
    setRpId("");
    setError("");
    setShowModal(false);
  };

  useEffect(() => {
    document.title = "MITM Scenario";
  }, []);

  // Listen for Ctrl + R or Cmd + R to reset
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        resetData();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Paste (JSON from UserAuthID)
  const handlePaste = async (e) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);

      if (parsed.id && parsed.expiry) {
        setUserDetails((prev) => ({
          ...prev,
          partialId: parsed.id,
          expiry: parsed.expiry,
        }));
      }
    } catch (err) {
      console.error("Invalid paste format", err);
    }
  };

  const handleFetch = () => {
    setError("");
    setShowModal(true);
  };

  return (
    <div className="p-6 rounded-md shadow-md border max-w-md mx-auto bg-white relative">
      <h2 className="w-full text-center text-pink-600 font-bold text-lg mb-4">
        IDP Portal (MITM Scenario)
      </h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {/* RP Inputs */}
      <div className="mb-2">
        <label>RP Name</label>
        <input
          className="p-2 border mb-2 ml-2 w-full"
          value={rpName}
          onChange={(e) => setRpName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>RP Identity No.</label>
        <input
          className="p-2 border mb-2 ml-2 w-full"
          value={rpId}
          onChange={(e) => setRpId(e.target.value)}
        />
      </div>

      <hr className="border-dotted border-t-2 border-gray-400 mb-4" />

      {/* End User fields */}
      <div className="mb-2">
        <label>End User Partial ID</label>
        <input
          className="w-full p-2 border"
          value={userDetails.partialId}
          readOnly
          onPaste={handlePaste}
        />
      </div>
      <div className="mb-2">
        <label>End User Expiry</label>
        <input
          className="w-full p-2 border"
          value={userDetails.expiry}
          readOnly
          onPaste={handlePaste}
        />
      </div>
      <div className="absolute top-[44%] right-[25px]">
        <button
          onClick={handlePaste}
          className="flex items-center gap-2 mb-3 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          title="Paste ID & Expiry"
        >
          <FiClipboard size={14} />
        </button>
      </div>
      <div className="mb-2">
        <label>End User Complete ID</label>
        <input
          className="w-full p-2 border"
          value={userDetails.completeId}
          readOnly
        />
      </div>

      <div className="text-right mt-4">
        <button
          onClick={handleFetch}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow"
        >
          Fetch CID
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              MITM Simulation
            </h3>
            <p className="mb-4">You ain’t getting the CID mate 🚫</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MITMScenario;
