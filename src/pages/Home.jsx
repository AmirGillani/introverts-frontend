import React from "react";
import Profile from "../components/Profile";
import Posts from "../components/Posts";
import RightSide from "../components/RightSide";

export default function Home() {
  return (
    <div className="grid grid-cols-[18rem_auto_20rem] gap-1 relative">
      <Profile />
      <Posts />
      <RightSide />
    </div>
  );
}
