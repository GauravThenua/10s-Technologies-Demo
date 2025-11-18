import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

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
import DBSearch from "./pages/DBSearch";
import Users from "./components/Users";
import GovtID from "./pages/GovtID";
import OnlineAuth from "./pages/OnlineAuth";
import Login from "./pages/Login"
import AdminOnlinePortal from "./pages/online-auth/AdminOnlinePortal";
import OnlineRP1 from "./pages/online-auth/OnlineRP1";
import OnlineRP2 from "./pages/online-auth/OnlineRP2";
import OnlineUserAuthID from "./pages/online-auth/OnlineUserAuthID";
import DBOnline from "./pages/online-auth/DBOnline";
import OnlineMITM from "./pages/online-auth/OnlineMITM";
import OnlineUserRegistration from "./pages/online-auth/online-auth-registration";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUsersPage = location.pathname === "/Users";
  const [showMenu, setShowMenu] = useState(false);

  // hide avatar for login page and root only
  const hideAvatarRoutes = ["/login"];
  const showAvatar = !hideAvatarRoutes.includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="bg-[#fbfbfc] min-h-screen font-sans text-[#1b1b1b] text-sm relative">

      {showAvatar && (
        <div className="absolute top-4 right-6">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <FiUser size={20} className="text-gray-700" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="flex justify-center px-2 py-8">
        {isUsersPage ? (
          <div className="w-full">
            <Routes>
              <Route path="/Users" element={<Users />} />
            </Routes>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-md shadow px-3 py-6">
            <Routes>

              {/* LOGIN ALWAYS FIRST */}
              <Route path="/login" element={<Login />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DemoSelector />
                  </ProtectedRoute>
                }
              />

              {/* BASIC */}
              <Route
                path="/basic"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/basic/register"
                element={
                  <ProtectedRoute>
                    <UserRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/basic/auth-id"
                element={
                  <ProtectedRoute>
                    <UserAuthID />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/basic/rp1"
                element={
                  <ProtectedRoute>
                    <RelyingParty1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/basic/rp2"
                element={
                  <ProtectedRoute>
                    <RelyingParty2 />
                  </ProtectedRoute>
                }
              />

              {/* ADVANCED */}
              <Route
                path="/advanced"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/advanced/govt-id"
                element={
                  <ProtectedRoute>
                    <GovtID />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth"
                element={
                  <ProtectedRoute>
                    <OnlineAuth />
                  </ProtectedRoute>
                }
              />

              {/* GOVT-ID SUB PAGES */}
              <Route
                path="/advanced/govt-id/register"
                element={
                  <ProtectedRoute>
                    <AdvanceUserRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/auth-id"
                element={
                  <ProtectedRoute>
                    <AdvanceUserAuthID />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/rp1"
                element={
                  <ProtectedRoute>
                    <AdvanceRP1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/rp2"
                element={
                  <ProtectedRoute>
                    <AdvanceRP2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/admin"
                element={
                  <ProtectedRoute>
                    <AdminPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/dbsearch"
                element={
                  <ProtectedRoute>
                    <DBSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/govt-id/mitm"
                element={
                  <ProtectedRoute>
                    <MITMScenario />
                  </ProtectedRoute>
                }
              />

              {/* ONLINE AUTH */}
              <Route
                path="/advanced/online-auth/register"
                element={
                  <ProtectedRoute>
                    <OnlineUserRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/auth-id"
                element={
                  <ProtectedRoute>
                    <OnlineUserAuthID />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/rp1"
                element={
                  <ProtectedRoute>
                    <OnlineRP1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/rp2"
                element={
                  <ProtectedRoute>
                    <OnlineRP2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/admin"
                element={
                  <ProtectedRoute>
                    <AdminOnlinePortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/dbsearch"
                element={
                  <ProtectedRoute>
                    <DBOnline />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced/online-auth/mitm"
                element={
                  <ProtectedRoute>
                    <OnlineMITM />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#fc844c] font-semibold">
          10S Technologies Ltd. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
