import React from "react";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function MyProfile({toggle}) {


  const {user} = useSelector(state=>state.auth);

  function handleLogout(e)
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href= "/";
  }

  return (
    <div className="w-full h-[60%]">
    
      
      <div className="rounded-2xl bg-card flex flex-col gap-7 py-6 px-6 w-full h-80 z-10 relative">
        <div className="w-full flex justify-between items-center">
          <h6 className="text-lg font-semibold">My Info</h6>
          <MdModeEdit size={20} onClick={()=> toggle()} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-semibold">Status</span>
            <span className="text-gray-500">{user.relationship ? user.relationship : "Write Relationship status"}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold">Lives</span>
            <span className="text-gray-500">{user.livesIn ? `In ${user.livesIn}` : "Write Lives In"}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold">Works</span>
            <span className="text-gray-500">{user.worksAt ? `In ${user.worksAt}` : "Write Works At"}</span>
          </div>
        </div>
        <button className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white  p-2 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-full" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
