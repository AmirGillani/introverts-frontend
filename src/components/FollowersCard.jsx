import React from "react";
import { Followers } from "../assets/constants/Followers";

export default function FollowersCard() {
  return (
    <div className="w-full p-2 relative z-10">
      <span className="font-bold text-black text-left">
        Who Is Following You
      </span>
      <div className="w-full flex flex-col justify-evenly items-start mt-4 h-80">
        {Followers.map((follower,index) => (
          <div className="flex  justify-between w-80" key={index}>
            <div className="flex w-full">
              <img
                src={follower.imgUrl}
                alt="follower"
                className="w-12 h-12 mr-1 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold">{follower.name}</span>
                <span>{follower.username}</span>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white w-16 p-0.5 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
