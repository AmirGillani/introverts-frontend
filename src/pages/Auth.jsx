import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import Signup from "../components/Signup";
import Login from "../components/Login";
export default function Auth() {

    const [haveAccount, setHaveAccount] = useState(false);

    function toggle()
    {
        setHaveAccount(!haveAccount)
    }

  return (
    <div className="flex md:justify-center md:items-center justify-center items-start w-full h-screen bg-input-color">
      <div className="grid md:grid-cols-2 justify-items-center w-[80%] h-[80%]">
        <div className="flex w-full justify-center items-center relative z-10">
          <div className="flex gap-5 justify-center items-center">
            <img src={logo} alt="logo" className="md:w-13 md:h-13 w-9 h-9" />
            <div className="flex flex-col gap-6">
              <h1 className="md:text-5xl text-3xl font-semibold bg-gradient-to-r from-[#f99827] to-[#f95f35] text-transparent bg-clip-text">
                INTROVERTS
              </h1>
              <span className="font-bold text-black md:text-xs text-[0.5rem]">
                Explore the ideas throughout the world
              </span>
            </div>
          </div>
        </div>
        {
            !haveAccount ?  <Signup toggle={toggle}/> :  <Login toggle={toggle} />
        }
       
      </div>
    </div>
  );
}
