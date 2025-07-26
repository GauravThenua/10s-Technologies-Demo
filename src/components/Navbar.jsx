import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">Identity Demo</Link>
      <div className="space-x-4">
        <Link to="/register">Register</Link>
        <Link to="/auth-id">Auth ID</Link>
        <Link to="/rp1">RP1</Link>
        <Link to="/rp2">RP2</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/mitm">MITM</Link>
      </div>
    </nav>
  );
}
