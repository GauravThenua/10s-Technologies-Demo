import React, { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";

const AdminPortal = () => {
  const [rpName, setRpName] = useState("");
  const [rpId, setRpId] = useState("");
  const [userDetails, setUserDetails] = useState({
    partialId: "",
    expiry: "",
    completeId: "",
    userName: "",
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const resetData = () => {
    setUserDetails({ partialId: "", expiry: "", completeId: "", userName: "" });
    setRpName("");
    setRpId("");
    setError("");
    setFetched(false);
  };

  useEffect(() => {
    document.title = "Admin Portal";
  }, []);

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

  // Extract only alphabetic username from ID
  const extractNameFromId = (id) => {
    if (!id) return "";
    const match = id.match(/^[A-Za-z]+/);
    return match ? match[0].trim().toLowerCase() : "";
  };

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

    if (!rpName.trim() || !rpId.trim()) {
      setError("Please enter RP Name and RP Identity No.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) {
      setError("No users found in database.");
      return;
    }

    // Extract name from pasted ID
    const extractedName = extractNameFromId(userDetails.partialId);

    if (!extractedName) {
      setError("Could not extract username from ID.");
      return;
    }

    // Normalize expiry: remove "/"
    const inputExpiry = userDetails.expiry.replace(/\//g, "").trim();

    // Find user ONLY BY NAME + EXPIRY
    const matchedUser = users.find((u) => {
      const cleanExpiry = (u.expiry || "").replace(/\//g, "");
      return (
        u.name.toLowerCase() === extractedName &&
        cleanExpiry === inputExpiry
      );
    });

    if (!matchedUser) {
      setError("Authentication Failed. Username or password incorrect.");
      return;
    }

    const userData = {
      ...userDetails,
      completeId: matchedUser.completeId,
      userName: matchedUser.name,
      rpName,
      rpId,
    };

    setUserDetails(userData);
    setFetched(true);

    const stored = JSON.parse(localStorage.getItem("idpData")) || [];
    localStorage.setItem("idpData", JSON.stringify([...stored, userData]));
  };

  const getColoredId = (id) => {
    if (!id) return null;
    const first = id.slice(0, 6);
    const middle = id.slice(6, 12);
    const last = id.slice(12);
    return (
      <>
        <span className="text-red-600">{first}</span>
        <span className="text-green-600">{middle}</span>
        <span className="text-blue-600">{last}</span>
      </>
    );
  };

  return (
    <div className="p-6 rounded-md shadow-md border max-w-md mx-auto bg-white relative">
      <h2 className="w-full text-center text-pink-600 font-bold text-lg mb-4">
        Identity Provider Portal
      </h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {/* RP Inputs */}
      <div className="mb-2">
        <label>RP Name</label>
        <input
          className="p-2 border mb-2 ml-2 w-full border-gray-400 rounded"
          value={rpName}
          onChange={(e) => setRpName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>RP Identity No.</label>
        <input
          className="p-2 border mb-2 ml-2 w-full border-gray-400 rounded"
          value={rpId}
          onChange={(e) => setRpId(e.target.value)}
        />
      </div>

      <hr className="border-dotted border-t-2 border-gray-400 mb-4" />

      {/* End User Partial Username (full JSON id pasted here) */}
      <div className="mb-2 relative">
        <label>End User Partial Username</label>
        <div className="relative">
          <input
            className="w-full p-2 border border-gray-400 rounded text-transparent caret-black placeholder-gray-400"
            value={userDetails.partialId}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, partialId: e.target.value }))
            }
            onPaste={handlePaste}
            placeholder="End User Partial Username"
          />
          <div className="absolute inset-0 flex items-center p-2 pointer-events-none overflow-hidden">
            {getColoredId(userDetails.partialId)}
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="mb-2">
        <label>End User Password</label>
        <input
          className="w-full p-2 border border-gray-400 rounded"
          value={userDetails.expiry}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, expiry: e.target.value }))
          }
        />
      </div>

      {/* Paste button */}
      <div className="absolute top-[44%] right-[25px]">
        <button
          onClick={handlePaste}
          className="flex items-center gap-2 mb-3 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          title="Paste ID & Expiry"
        >
          <FiClipboard size={14} />
        </button>
      </div>

      {/* End User Complete Username */}
      <div className="mb-2 relative">
        <label>End User Complete Username</label>
        <div className="relative">
          <input
            className="w-full p-2 border border-gray-400 rounded text-transparent caret-black placeholder-gray-400"
            value={userDetails.completeId}
            placeholder="Complete Username"
            readOnly
          />
          <div className="absolute inset-0 flex items-center p-2 pointer-events-none overflow-hidden">
            {getColoredId(userDetails.completeId)}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-right mt-4">
        {fetched ? (
          <button
            onClick={resetData}
            className="bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Reset
          </button>
        ) : (
          <button
            onClick={handleFetch}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow"
          >
            Fetch CID
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
