import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../assets/img/logo.png";
import {Link} from "react-router-dom";

export default function LogoSearch({handleSearch}) {
  const [query,setQuery]= useState("");
  return (
    <div className="flex gap-1 justify-center items-center h-[10%]">
      <Link to={"/"}>
      <img src={Logo} alt="logo" />
      </Link>
      
      <div className="flex gap-1 justify-center items-center bg-input-color p-1 rounded-sm">
        <input type="text" placeholder="#Explore" className="bg-transparent outline-none" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <div className="bg-gradient-to-l from-[#f99827] to-[#f95f35] rounded-sm cursor-pointer" onClick={()=>handleSearch(query)}>
          <CiSearch size={26} className="text-white font-bold" />
        </div>
      </div>
    </div>
  );
}
