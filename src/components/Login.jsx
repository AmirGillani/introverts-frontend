import React from "react";

export default function Signup({ toggle }) {
  return (
    <div className="w-full h-full flex justify-center items-center relative z-10">
      <div className="w-[70%] bg-white rounded-2xl py-3 px-2 flex flex-col gap-2 justify-center items-center">
        <span className="font-bold text-black text-xl my-6">Login</span>

        <form className="flex flex-col gap-3 w-full">
          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Usernames"
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Password"
            />
          </div>
        </form>
        <span className="text-black my-3 md:text-sm text-xs" onClick={() => toggle()}>
          Don't Have A Account ?{" "}
          <span className="cursor-pointer hover:underline hover:text-blue-600">
            Signup !!
          </span>
        </span>
        <button className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24">
          Login
        </button>
      </div>
    </div>
  );
}
