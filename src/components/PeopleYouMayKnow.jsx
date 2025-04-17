import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, followUser, unFollowUser } from "../REDUX/authReducer";
import {Link} from "react-router-dom";

export default function FollowersCard() {
  const dispatch = useDispatch();
  const { users, user, token, status } = useSelector((state) => state.auth);


  

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function follow(id, token) {
    dispatch(followUser(id, token)).then(() => {
      dispatch(getAllUsers());
    });
  }

  function unfollow(id, token) {
    dispatch(unFollowUser(id, token)).then(() => {
      dispatch(getAllUsers());
    });
  }



  return (
    <div className={`min-w-[360px] max-w-[370px] relative z-10 mb-1 rounded-2xl px-4 sm:hidden bg-white py-1 md:hidden block`}>
      <span className="font-bold text-black text-left block mb-4 text-lg">
        People You May Know
      </span>

      <div className="flex flex-row items-center gap-4 overflow-x-auto pb-2 pl-4">


        {users.map((peoples, index) => {
          {
            return user._id !== peoples._id && (
              <Link to={`/user/${peoples._id}`} key={index}>
               <div
                key={index}
                className="min-w-[90px] max-w-[110px] bg-white rounded-2xl shadow-md flex flex-col items-center p-4"
              >
                <img
                  src={peoples.profilePic}
                  alt="follower"
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
                <div className="text-center mb-3">
                  <p className="font-semibold text-sm">{peoples.firstName}</p>
                  <p className="text-xs text-gray-500">@{peoples.username?.slice(0, 11)}</p>
                </div>

                {peoples.followers.includes(user._id) ? (
                  <button
                    className="text-xs bg-white text-orange-500 border-orange-500 px-4 py-1 rounded-full hover:text-white hover:cursor-pointer hover:bg-orange border transition-all duration-200"
                    onClick={() => unfollow(peoples._id, token)}
                    disabled={status === "loading"}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="text-xs bg-gradient-to-r from-[#f99827] to-[#f95f35] text-white px-4 py-1 rounded-full hover:cursor-pointer hover:from-white hover:to-white hover:text-orange-500 hover:border-orange-500 border transition-all duration-200"
                    onClick={() => follow(peoples._id, token)}
                    disabled={status === "loading"}
                  >
                    Follow
                  </button>
                )}
              </div></Link>
             
            );
          }
        })}
      </div>
    </div>
  );
}
