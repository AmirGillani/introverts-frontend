import React from "react";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function MyProfile({toggle}) {

  const {person} = useSelector(state=>state.posts);

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
       
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-semibold">Status</span>
            <span className="text-gray-500">{ person?.relationship ? person?.relationship : "Relationship  Not Written"}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold">Lives</span>
            <span className="text-gray-500">{person.livesIn ? `In ${person.livesIn}` : "Lives In Not Written"}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold">Works</span>
            <span className="text-gray-500">{person.worksAt ? `In ${person.worksAt}` : "Works At Not Written"}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
