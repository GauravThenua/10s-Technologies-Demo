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

  // Reset handler
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
          partialId: parsed.id.toString().slice(0, 12) + "****",
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

    // // ✅ Validation for RP Name and RP Identity match
    // if (rpName === "RP1" && rpId !== "LEI1") {
    //   setError("Please enter valid credentials");
    //   return;
    // }
    // if (rpName === "RP2" && rpId !== "OV1") {
    //   setError("Please enter valid credentials");
    //   return;
    // }
    // if (rpName !== "RP1" && rpName !== "RP2") {
    //   setError("Please Enter valid RP name");
    //   return;
    // }
    // if (rpId !== "LEI1" && rpId !== "OV1") {
    //   setError("Please Enter valid RP Identity No.");
    //   return;
    // }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) {
      alert("No users found.");
      return;
    }

    // ✅ Find user by partialId (instead of last user)
    const matchedUser = users.find(
      (u) =>
        u.partialId === userDetails.partialId.slice(0, 6) && u.expiry === userDetails.expiry
    );

    if (!matchedUser) {
      setError("No matching user found for given Partial ID and Expiry.");
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
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, partialId: e.target.value }))
          }
        />
      </div>

      <div className="mb-2">
        <label>End User Expiry</label>
        <input
          className="w-full p-2 border"
          value={userDetails.expiry}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, expiry: e.target.value }))
          }
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
