import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Input from "../components/Input";
import MyPosts from "../components/MyPosts";
import { useSelector , useDispatch } from "react-redux";
import { timelinePosts } from "../REDUX/postReducer";

export default function Profile({toggle}) {

  const dispatch = useDispatch();

  const {posts} = useSelector(state=>state.posts);

  const {user,token} = useSelector(state=>state.auth);

  const [myPosts, setMyPosts] = useState([]);

  useEffect(()=>{
    dispatch(timelinePosts(token))
  },[dispatch])

  useEffect(()=>{
    if(posts.length >0)
    {
      const myPosts = posts.filter(post => post.userID === user._id);

      setMyPosts(myPosts);
     
    }
  },[posts, user])

  return (
    <div className="flex flex-col items-center gap-2  md:h-[117vh]   ">
      <ProfileCard toggle={toggle}  />
     <MyPosts posts={myPosts} user={user} />
    </div>
  );
}
