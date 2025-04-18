import React  from "react";
import home from "../assets/img/home.png";
import notification from "../assets/img/noti.png";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";


export default function MobileMenuBar() {



 
  return (
    <>
      <div className="md:hidden flex justify-evenly items-center w-full  fixed top-0 left-0 right-0 z-50 bg-white p-2 shadow">
        <Link to="/">
          <img src={home} alt="icon" className="w-6 h-6 cursor-pointer" />
        </Link>
        <Link to="/profile">
          <MdPerson size={30} className="font-bold cursor-pointer" />
        </Link>
        <img src={notification} alt="icon" className="w-6 h-6 cursor-pointer" />
        <button
          className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
      
   
      
      
    </>
  );
}
