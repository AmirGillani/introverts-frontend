import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import cover from "../assets/img/cover.jpg";
import profile from "../assets/img/user.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileCard({  person }) {
  const { posts } = useSelector((state) => state.posts);

  const [currentAddress, setCurrentAddress] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentAddress(location.pathname);
  }, [location]);

  function getPosts(id) {
    const myPosts = posts?.filter((post) => post.userID === id);
    return myPosts?.length || 0;
  }

  return (
    <div
      className={`${
        currentAddress === "/" ? "w-[100%]" : "md:w-[80%] w-[100%]"
      }   md:h-[70%] h-[65vh]  overflow-hidden`}
    >
      <div
        className={`rounded-3xl overflow-clip relative z-10 cursor-pointer ${
          currentAddress === "/profile" ? "w-[100%]" : ""
        }`}
      >
        <div className="relative">
          <img
            src={person?.coverPic ? person.coverPic : cover}
            alt="cover"
            onError={(e) => (e.target.src = cover)}
            className={`overflow-clip w-full 
               h-48
            `}
          />

          <img
            src={person.profilePic ? person.profilePic : person.profilePic}
            alt="profile"
            onError={(e) => (e.target.src = profile)}
            className={`absolute z-10 -bottom-12 rounded-full shadow-lg shadow-[rgba(0,0,0,0.25)] md:left-56  left-36 md:w-32 md:h-32  w-24 h-24 `}
          />
        </div>

        <div className="bg-card flex flex-col gap-0.5 justify-center items-center p-3 rounded-b-2xl">
          <div className="mt-14 mb-6 flex flex-col justify-center items-center gap-0.5">
            <span className="font-black">
              {person ? person.firstName : person.firstName}
              {person ? person.lastName : person.lastName}
            </span>
            <span className="flex gap-1 items-center">
              {person?.worksAt || ""}
            </span>
          </div>

          <hr className="w-full text-hr font-extrabold" />

          <div className="flex flex-wrap justify-around md:justify-between items-center w-full px-4 gap-y-4">


            <Link to={`/followers/${person._id}`} className="flex flex-col justify-center items-center">
              <span className="font-bold">
                {person.followers?.length ? person.followers?.length : 0}
              </span>
              <span className="text-gray-400">Followers</span>
            </Link>

            <div className="border-l-2 border-hr h-14"></div>

            <Link to={`/following/${person._id}`} className="flex flex-col justify-center items-center">
              <span className="font-bold">
                {person.following?.length ? person.following?.length : 0}
              </span>
              <span className="text-gray-400">Following</span>
            </Link>

            {currentAddress === "/profile" && (
              <>
                <div className="border-l-2 border-hr h-14"></div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold">
                    {posts?.length > 0 ? getPosts(person && person._id) : 0}
                  </span>
                  <span className="text-gray-400">Posts</span>
                </div>
              </>
            )}
          </div>

          <hr className="w-full text-hr" />
        </div>
      </div>
    </div>
  );
}
