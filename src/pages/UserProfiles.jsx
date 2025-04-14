import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import MyPosts from "../components/MyPosts";
import { useSelector, useDispatch } from "react-redux";
import { userPosts } from "../REDUX/postReducer";
import { useParams } from "react-router-dom";

export default function Profile({ toggle }) {
  const dispatch = useDispatch();

  const { person,personPosts } = useSelector((state) => state.posts);

  const { id } = useParams();

  alert(id);

  const [myPosts, setMyPosts] = useState([]);

  const [personHook, setPerson] = useState({});

  useEffect(() => {
    dispatch(userPosts(id));
  }, [dispatch,id]);

  useEffect(() => {
    if (personPosts.length > 0) {
      setMyPosts(personPosts);
    }

    if(person) setPerson(person)
  }, [personPosts,person]);

  return (
    <div className="flex flex-col items-center gap-2  md:h-[117vh]   ">
      <ProfileCard toggle={toggle} />
      <MyPosts posts={myPosts} user={personHook} />
    </div>
  );
}
