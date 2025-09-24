import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import UserAuthID from "./pages/UserAuthID";
import RelyingParty1 from "./pages/RelyingParty1";
import RelyingParty2 from "./pages/RelyingParty2";
import AdminPortal from "./pages/AdminPortal";
import MITMScenario from "./pages/MITMScenario";
import DemoSelector from "./pages/DemoSelector";
import AdvanceUserRegistration from "./pages/AdvanceUserRegistration";
import AdvanceUserAuthID from "./pages/AdvanceUserAuthID";
import AdvanceRP1 from "./pages/AdvanceRP1";
import AdvanceRP2 from "./pages/AdvanceRP2";
import DBSearch from "./pages/DBsearch";
import Users from "./components/Users";

function App() {
  const location = useLocation();
  const isUsersPage = location.pathname === "/Users"; // check if current page is Users

  return (
    <div className="bg-[#fbfbfc] min-h-screen font-sans text-[#1b1b1b] text-sm">
      {/* Navbar */}
      {/* <div className="bg-white border-b px-3 py-2 sticky top-0 z-50 shadow-sm">
        <Navbar />
      </div> */}

      {/* Main Content Area */}
      <main className="flex justify-center px-2 py-8">
        {isUsersPage ? (
          // Different layout for Users
          <div className="w-full">
            <Routes>
              <Route path="/Users" element={<Users />} />
            </Routes>
          </div>
        ) : (
          // Default compact layout for all other pages
          <div className="w-full max-w-md bg-white rounded-md shadow px-3 py-6">
            <Routes>
              <Route path="/" element={<DemoSelector />} />
              <Route path="/basic" element={<Home />} />
              <Route path="/basic/register" element={<UserRegistration />} />
              <Route path="/basic/auth-id" element={<UserAuthID />} />
              <Route path="/basic/rp1" element={<RelyingParty1 />} />
              <Route path="/basic/rp2" element={<RelyingParty2 />} />

              <Route path="/advanced" element={<Home />} />
              <Route path="/advanced/register" element={<AdvanceUserRegistration />} />
              <Route path="/advanced/auth-id" element={<AdvanceUserAuthID />} />
              <Route path="/advanced/rp1" element={<AdvanceRP1 />} />
              <Route path="/advanced/rp2" element={<AdvanceRP2 />} />
              <Route path="/advanced/admin" element={<AdminPortal />} />
              <Route path="/advanced/DBsearch" element={<DBSearch />} />
              <Route path="/advanced/mitm" element={<MITMScenario />} />
            </Routes>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#fc844c] font-semibold">10S Technologies Ltd. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
