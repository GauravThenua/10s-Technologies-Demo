// pages/Login.js
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // extract redirect path from query param
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.email === "admin@demo.com" && form.password === "admin1234") {
      localStorage.setItem("isLoggedIn", "true");
      navigate(redirectTo);
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfc] px-4">
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#050719] mb-8 text-center">
        Please Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {error && (
          <div className="mb-4 text-red-500 font-semibold text-sm">{error}</div>
        )}

        <label className="block mb-2 font-semibold text-[#23282d]">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded border-[#dee6ea] focus:outline-none focus:ring-2 focus:ring-[#ff5800]"
          placeholder="Enter Email"
          required
        />

        <label className="block mb-2 font-semibold text-[#23282d]">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 p-2 border rounded border-[#dee6ea] focus:outline-none focus:ring-2 focus:ring-[#ff5800]"
          placeholder="Enter Password"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#ff5800] text-white font-semibold py-2 rounded-lg hover:bg-[#e05600] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
