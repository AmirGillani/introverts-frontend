import React, { useEffect, useState } from "react";
import LogoSearch from "./LogoSearch";
import ProfileCard from "./ProfileCard";
import FollowersCard from "./FollowersCard";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfile";
import { useLocation,useNavigate  } from "react-router-dom";
import { search } from "../REDUX/postReducer";
import { useDispatch } from "react-redux";

export default function Profile({ toggle }) {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  function handleSearch(query)
  {
    dispatch(search(query));
    navigate("/")
  }

  const [currentAddress, setCurrentAddress] = useState("/");

  const location = useLocation();

  useEffect(() => {
    setCurrentAddress(location.pathname);
  }, [location]);

  return (
    <div className="md:flex hidden flex-col justify-center items-center gap-3 overflow-hidden h-screen">
      <LogoSearch handleSearch={handleSearch} />

      {currentAddress === "/profile" ? (
        <MyProfile toggle={toggle} />
      ) : currentAddress.startsWith("/user/") ? (
        <UserProfile />
      ) : (
        <ProfileCard />
      )}

      <FollowersCard />
    </div>
  );
}
