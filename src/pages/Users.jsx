import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowers } from "../REDUX/authReducer";

export default function Users() {
  const dispatch = useDispatch();
  const { text } = useParams();

  const { user, followers = [], status } = useSelector((state) => state.auth);

  useEffect(() => {

    if(text !== "followers" && text !== "following" )
    {
      dispatch(fetchFollowers(user._id, "likes",text));
    }else{
      if (user?._id && text) {
        dispatch(fetchFollowers(user._id, text));
      }
    }
    
  }, [user, dispatch, text]);

  return (
    <div className="relative z-20 px-4 py-6 min-h-[80vh]">
      <h2 className="text-3xl capitalize text-center font-semibold text-gray-800 mb-6">
        {text !== "followers" && text !== "following" ?"Likes":text}
      </h2>

      {status === "loading" ? (
        <p className="text-center text-gray-500 text-lg">Loading {text}...</p>
      ) : followers.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No {text} found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {followers.map((person) => (
            <div
              key={person._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 p-4 w-full max-w-md"
            >
              <img
                src={person.profilePic}
                alt={person.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-400"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-800">
                    {person.firstName}
                  </span>
                  <span className="font-bold text-sm text-gray-800">
                    {person.lastName}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  @{person.username?.substring(0, 11)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
