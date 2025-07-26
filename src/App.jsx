import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import UserAuthID from "./pages/UserAuthID";
import RelyingParty1 from "./pages/RelyingParty1";
import RelyingParty2 from "./pages/RelyingParty2";
import AdminPortal from "./pages/AdminPortal";
import MITMScenario from "./pages/MITMScenario";

function App() {
  return (
    <div className="bg-[#fbfbfc] min-h-screen font-sans text-[#1b1b1b] text-sm">
      {/* Compact Navbar */}
      {/* <div className="bg-white border-b px-3 py-2 sticky top-0 z-50 shadow-sm">
        <Navbar />
      </div> */}

      {/* Main Content Area */}
      <main className="flex justify-center px-2 py-4">
        <div className="w-full max-w-xs bg-white rounded-md shadow px-3 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/auth-id" element={<UserAuthID />} />
            <Route path="/rp1" element={<RelyingParty1 />} />
            <Route path="/rp2" element={<RelyingParty2 />} />
            {/* <Route path="/admin" element={<AdminPortal />} /> */}
            {/* <Route path="/mitm" element={<MITMScenario />} /> */}
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-2">
        © {new Date().getFullYear()} <span className="text-[#fc844c] font-semibold">10S</span>
      </footer>
    </div>
  );
}

export default App;
