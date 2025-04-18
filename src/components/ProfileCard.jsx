import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cover from "../assets/img/cover.jpg";
import profile from "../assets/img/user.png";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProfileCard({ toggle }) {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const [currentAddress, setCurrentAddress] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentAddress(location.pathname);
  }, [location]);

  if (!user) return null;

  const getPosts = (id) =>
    posts?.filter((post) => post.userID === id)?.length || 0;

  return (
    <div
      className={`${
        currentAddress === "/profile" ? "md:w-[80%] w-full p-2" : "w-full p-2"
      } md:h-[90%] overflow-hidden`}
    >
      <div className="rounded-3xl overflow-hidden relative z-10 bg-white shadow-lg">
        {/* Cover and Profile Image Section */}
        <Link to="/profile" className="block relative">
          <img
            src={user.coverPic || cover}
            alt="cover"
            onError={(e) => (e.target.src = cover)}
            className={`w-full object-cover ${
              currentAddress === "/profile" ? "h-52" : "h-36"
            }`}
          />
          <img
            src={user.profilePic || profile}
            alt="profile"
            onError={(e) => (e.target.src = profile)}
            className={`absolute z-10 -bottom-12 rounded-full shadow-lg border-4 border-white ${
              currentAddress === "/profile"
                ? "w-28 h-28 md:left-60 left-32"
                : "w-24 h-24 md:left-24 left-32"
            }`}
          />
        </Link>

        {/* Info Section */}
        <div className="bg-card flex flex-col items-center p-3 pt-16 rounded-b-2xl">
          <div className="flex flex-col justify-center items-center gap-1 mb-4">
            <span className="font-black text-lg">
              {user.firstName} {user.lastName}
            </span>
            <span className="flex gap-1 items-center text-sm text-gray-600">
              {user?.worksAt || ""}
              <MdModeEdit
                className="md:hidden inline-block ml-1 text-gray-500 cursor-pointer"
                onClick={toggle}
              />
            </span>
          </div>

          <hr className="w-full border-t border-gray-300 mb-2" />

          <div className="flex justify-around items-center w-full px-4 text-center">
            <Link to="/followers" className="flex-1">
              <div>
                <span className="font-bold">{user.followers?.length || 0}</span>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
            </Link>

            <div className="border-l border-gray-300 h-10 mx-2"></div>

            <Link to="/following" className="flex-1">
              <span className="font-bold">{user.following?.length || 0}</span>
              <div className="text-gray-400 text-sm">Following</div>
            </Link>

            {currentAddress === "/profile" && (
              <>
                <div className="border-l border-gray-300 h-10 mx-2"></div>
                <div className="flex-1">
                  <span className="font-bold">{getPosts(user._id)}</span>
                  <div className="text-gray-400 text-sm">Posts</div>
                </div>
              </>
            )}
          </div>

          <hr className="w-full border-t border-gray-300 mt-2" />

          {currentAddress !== "/profile" && (
            <Link to="/profile" className="mt-2 text-orange-500 font-bold">
              My Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
