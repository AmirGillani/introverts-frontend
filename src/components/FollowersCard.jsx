import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  followUser,
  unFollowUser,
  getSingleUser,
} from "../REDUX/authReducer";

import {Link} from "react-router-dom";

import { timelinePosts } from "../REDUX/postReducer";

export default function FollowersCard() {
  const dispatch = useDispatch();

  const { users, user, token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const follow = async (id, token) => {
    await dispatch(followUser(id, token));
    await dispatch(getAllUsers());
    await dispatch(getSingleUser(user._id));
    await dispatch(timelinePosts(token));
  };

  const unfollow = async (id, token) => {
    await dispatch(unFollowUser(id, token));
    await dispatch(getAllUsers());
    await dispatch(getSingleUser(user._id));
    await dispatch(timelinePosts(token));
  };

  return (
    <div className="w-full p-2 relative z-10 h-[30%]">
      <span className="font-bold text-black text-left block mb-2">
        People You May Know
      </span>

      <div className="w-full h-[calc(100%-2rem)] overflow-y-auto pr-1">
        {users.map((peoples, index) => {
          if (peoples._id !== user._id) {
            return (
              <Link to={`/user/${peoples._id}`} key={index}>
                <div className="flex justify-between w-80 mb-4" key={index}>
                  <div className="flex w-full">
                    <img
                      src={peoples.profilePic}
                      alt="follower"
                      className="w-12 h-12 mr-2 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold">{peoples.firstName}</span>
                      <span>{peoples.username?.slice(0, 11)}</span>
                    </div>
                  </div>

                  <div className="w-full flex justify-center items-center">
                    {peoples.followers.includes(user._id) ? (
                      <button
                        className="text-sm bg-white text-orange-500 border-orange-500 w-16 p-0.5 rounded-sm hover:text-white hover:cursor-pointer hover:bg-orange border transition-all duration-200"
                        onClick={() => unfollow(peoples._id, token)}
                        disabled={status === "loading"}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white w-16 p-0.5 rounded-sm cursor-pointer hover:cursor-pointer hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange"
                        onClick={() => follow(peoples._id, token)}
                        disabled={status === "loading"}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
