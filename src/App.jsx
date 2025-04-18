import Home from "./pages/Home";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProfileSideBar from "./components/ProfileSideBar";
import RightSideSideBar from "./components/RightSideBar";
import Profile from "./pages/Profile";
import UserProfiles from "./pages/UserProfiles";
import Auth from "./pages/Auth";
import MobileMenuBar from "./components/MobileMenuBar";
import "./App.css";
import { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";
import SharePost from "./components/SharePost";
import { useSelector } from "react-redux";
import Users from "./pages/Users";

function App() {
  const { authenticated, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // LOGOUT AUTOMATICALLY DEPENDING UPON TOKEN EXPIRY DATE

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        const now = Date.now();

        if (expiry <= now) {
          logout();
        } else {
          const timeout = setTimeout(() => {
            logout();
          }, expiry - now);

          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error("Invalid token");
        logout(); // fallback in case decoding fails
      }
    }
  }, []);

  function toggle() {
    setOpen(!open);
  }

  function toggle2() {
    setOpen2(!open2);
  }

  return (
    <Router>
      {authenticated ? (
        <div>
          {/* CANT SEND NOTIFICATION IN SERVERLESS PLATFORM LIKE VERCEL */}

          {/* <NotificationComponent /> */}
          <MobileMenuBar />
          {open && <EditProfileModal close={toggle} />}
          {open2 && <SharePost close={toggle2} />}
          <div className="overflow-hidden p-2 text-black bg-background relative mt-12 md:mt-0">
            <div className="grid md:grid-cols-[18rem_auto_20rem] gap-1 relative">
              <ProfileSideBar toggle={toggle} />
              <Routes>
                <Route path="/" element={<Home content="Home Page" />} />
                <Route
                  path="/profile"
                  element={<Profile content="Profile Page" toggle={toggle} />}
                />
                <Route
                  path="/user/:id"
                  element={
                    <UserProfiles content="Profile Page" toggle={toggle} />
                  }
                />
                 <Route
                  path="/:text"
                  element={
                    <Users content="Profile Page" />
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <RightSideSideBar toggle2={toggle2} />
            </div>

            {/* GLOW EFFECTS */}
            <div className="absolute -top-6 right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
            <div className="absolute -left-6 top-52 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Routes>
            <Route path="/" element={<Auth content="Login" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* GLOW EFFECTS */}
          <div className="absolute -top-6 right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
          <div className="absolute -left-6 top-52 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
        </div>
      )}
    </Router>
  );
}

export default App;
