import React from "react";
import notification from "../assets/img/noti.png";
import home from "../assets/img/home.png";
import comment from "../assets/img/comment.png";
import { CiSettings } from "react-icons/ci";
import { Trends } from "../assets/constants/Trends.js";
import { Link } from "react-router-dom";
export default function RightSide({toggle2}) {
  return (
    <div className="md:flex hidden flex-col gap-3 relative z-10 items-center w-[80%]">
      <div className="flex justify-between items-center w-full mt-1">
        <Link to={"/"}>
        <img src={home} alt="icon" className="w-6 h-6 cursor-pointer" />
        </Link>
        
        <img src={notification} alt="icon" className="w-6 h-6 cursor-pointer" />
        <img src={comment} alt="icon" className="w-6 h-6 cursor-pointer" />

        <CiSettings size={30} className="font-bold cursor-pointer" />
      </div>

      <div className="rounded-2xl bg-card flex flex-col gap-2 py-6 px-6 w-full">
        <h6 className="text-xl font-semibold">Trends For You</h6>
        {Trends.map((trend,index) => {
          return (
            <div className="flex flex-col" key={index}>
              <span className="font-semibold">#{trend.name}</span>
              <span className="text-gray-500">{trend.shares}shares</span>
            </div>
          );
        })}
      </div>

      <button className="w-full bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white  p-0.5 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange py-2" onClick={()=>toggle2()}>
        Share
      </button>
    </div>
  );
}
