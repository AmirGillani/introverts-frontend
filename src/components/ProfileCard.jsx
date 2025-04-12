import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cover from "../assets/img/cover.jpg";
import profile from "../assets/img/user.png";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProfileCard({ toggle }) {
  const { user, status } = useSelector((state) => state.auth);

  const { posts } = useSelector((state) => state.posts);

  const [currentAddress, setCurrentAddress] = useState("/");

  const location = useLocation();

  useEffect(() => {
    setCurrentAddress(location.pathname);
  }, [location]);

  useEffect(()=>{
    console.log("hi")
  },[status])

  function getPosts(id) {
    const myPosts = posts.filter((post) => post.userID === id);

    return myPosts.length;
  }

  return (
    <Link
      to={"/profile"}
      className={`${currentAddress === "/profile" ? "w-[80%]" : "w-[100%]"} h-[60%] overflow-hidden`}
    >
      <div
        className={`rounded-3xl overflow-clip relative z-10 cursor-pointer ${
          currentAddress === "/profile" && "w-[100%]"
        }`}
      >
        <div className="relative">
          {status === "loading" ? (
            <img
              src={user.coverPic}
              alt=""
              className={`overflow-clip w-full ${
                currentAddress === "/profile" && "h-48"
              }`}
            />
          ) : user.coverPic ? (
            <img
              src={user.coverPic}
              alt=""
              className={`overflow-clip w-full ${
                currentAddress === "/profile" && "h-48"
              }`}
            />
          ) : (
            <img
              src={cover}
              alt=""
              className={`overflow-clip w-full ${
                currentAddress === "/profile" && "h-48"
              }`}
            />
          )}

          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt=""
              className={`absolute z-10 -bottom-12  rounded-full left-24 shadow-lg shadow-[rgba(0,0,0,0.25)]  ${
                currentAddress === "/profile"
                  ? "w-32 md:left-60 left-24"
                  : "w-24 left-24"
              }`}
            />
          ) : (
            <img
              src={profile}
              alt=""
              className={`absolute z-10 -bottom-12  rounded-full left-24 shadow-lg shadow-[rgba(0,0,0,0.25)]  ${
                currentAddress === "/profile"
                  ? "w-32 md:left-60 left-24"
                  : "w-24 left-24"
              }`}
            />
          )}
        </div>
        <div className="bg-card flex flex-col gap-0.5 justify-center items-center p-3 rounded-b-2xl ">
          <div className="mt-14 mb-6 flex flex-col justify-center items-center gap-0.5">
            <span className="font-black">
              {user.firstName} {user.lastName}
            </span>
            <span>
              {user.worksAt && user.worksAt}
              <MdModeEdit
                className="md:hidden inline-block "
                onClick={() => toggle()}
              />
            </span>
          </div>

          <hr className="w-full text-hr font-extrabold" />

          <div className="flex gap-0.5 justify-between items-center w-full px-4">
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold">{user.followers.length}</span>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="border-l-2 border-hr h-14"></div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold">{user.following.length}</span>
              <span className="text-gray-400">Following</span>
            </div>
            {currentAddress === "/profile" && (
              <>
                <div className="border-l-2 border-hr h-14"></div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold">
                    {posts.length > 0 ? getPosts(user._id) : 0}
                  </span>
                  <span className="text-gray-400">Posts</span>
                </div>
              </>
            )}
          </div>

          <hr className="w-full text-hr" />
          {currentAddress !== "/profile" && (
            <span className="text-orange font-bold">My Profile</span>
          )}
        </div>
      </div>
    </Link>
  );
}
