import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSideBar from "./components/ProfileSideBar";
import RightSideSideBar from "./components/RightSideBar";
import Profile from "./pages/Profile";
import MobileMenuBar from "./components/MobileMenuBar";
import "./App.css";

function App() {
  return (
    <Router>
      <MobileMenuBar />
      <div className="overflow-hidden p-2 text-black bg-background relative">
        <div className="grid md:grid-cols-[18rem_auto_20rem] gap-1 relative">
          
          <ProfileSideBar />
          <Routes >
            <Route path="/" element={<Home content="Home Page" />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile content="Profile Page" />} />
          </Routes>
          <RightSideSideBar />
        </div>
        {/* GLOWS */}
        <div className="absolute -top-6 right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
        <div className="absolute -left-6 top-52 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
      </div>
    </Router>
  );
}

export default App;
