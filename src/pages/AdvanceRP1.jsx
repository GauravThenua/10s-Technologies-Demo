import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiClipboard } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const AdvanceRP1 = () => {
  const [input, setInput] = useState({ name: "", id: "", expiry: "" });
  const [submitted, setSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Relying Party 1";
  }, []);

  // Validate credentials
  const handleSubmit = () => {
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.name.toLowerCase() === input.name.trim().toLowerCase() &&
        input.id.trim().startsWith(u.partialId) && // ✅ match only first 6 digits
        u.expiry === input.expiry.trim()
    );

    if (!matchedUser) {
      setError(
        "Invalid credentials. Please enter correct Name, ID, and Expiry."
      );
      toast.error("Authentication Failed!", { position: "top-center" });
      return;
    }

    toast.success("Please Reach Out To IDP For Complete ID", {
      position: "top-center",
    });
    setSubmitted(true);

    const id = setTimeout(() => {
      reset();
    }, 3 * 60 * 1000);
    setTimerId(id);
  };

  // Reset data
  const reset = () => {
    setInput({ name: "", id: "", expiry: "" });
    setSubmitted(false);
    setError("");
    if (timerId) clearTimeout(timerId);
  };

  // Keyboard shortcut Ctrl+R / Cmd+R
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isRefresh =
        (isMac && e.metaKey && e.key.toLowerCase() === "r") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "r");

      if (isRefresh) {
        e.preventDefault();
        reset();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [timerId]);

  // Paste function
  const handlePaste = async (e) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);

      if (parsed.id && parsed.expiry) {
        setInput((prev) => ({
          ...prev,
          id: parsed.id,
          expiry: parsed.expiry,
        }));
      }
    } catch (err) {
      console.error("Invalid paste format", err);
    }
  };

  // Function to color ID digits
  const getColoredId = (id) => {
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
    <div className="p-8 max-w-md mx-auto relative">
      <h2 className="text-xl font-bold mb-4">
        Relying Party 1 - Online Store 1
      </h2>

      {!submitted ? (
        <>
          <input
            className="w-[80%] p-2 mb-2 border"
            placeholder="Name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />

          {/* ID field with color logic */}
          <div className="relative w-[80%] mb-2">
            <div className=" border relative">
              {/* Transparent input with placeholder visible when empty */}
              <input
                className="w-full p-2 border pr-10 text-transparent caret-black placeholder-gray-400"
                style={{
                  background: "transparent",
                  textShadow: input.id ? "0 0 0 0" : "none",
                }}
                placeholder="ID"
                value={input.id}
                onChange={(e) => setInput({ ...input, id: e.target.value })}
                onPaste={handlePaste}
              />

              {/* Colored text overlay */}
              <div className="absolute inset-0 flex items-center p-2 pr-10 pointer-events-none overflow-hidden">
                {getColoredId(input.id)}
              </div>
            </div>

            <button
              onClick={handlePaste}
              className="absolute inset-y-0 right-[-30px] flex items-center text-gray-600 hover:text-gray-900"
              title="Paste ID & Expiry"
            >
              <FiClipboard size={18} />
            </button>
          </div>

          <input
            className="w-[80%] p-2 mb-2 border"
            placeholder="Expiry"
            value={input.expiry}
            onChange={(e) => setInput({ ...input, expiry: e.target.value })}
            onPaste={handlePaste}
          />

          <div className="absolute ">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              OK
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mb-2 mt-9">{error}</p>}
        </>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              <span className="text-gray-900">{input.name || "-"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">ID:</span>{" "}
              <span className="text-gray-900">{input.id || "-"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Expiry:</span>{" "}
              <span className="text-gray-900">{input.expiry || "-"}</span>
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

      <ToastContainer />
    </div>
  );
};

export default AdvanceRP1;
