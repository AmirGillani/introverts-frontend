import React, { useState } from "react";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import comment from "../assets/img/comment.png";
import share from "../assets/img/share.png";
import CommentsBlock from "./Comments";
import { useDispatch } from "react-redux";
import {likePost} from "../REDUX/postReducer";

export default function Post({ name, description, user,likes, img, id,token }) {

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);

  // CHECK EITHER USER HAVE LIKE POST ALREADY OR NOT

  const [liked, setLiked] = useState(likes.includes(user._id));

  //  WE CAN USE LIKES IN PROP BUT I WANT TO AUTOMATICALLY CHANGE VALUE 

  // WHEN USER CLICK LIKES IT CAN BE DONE BY HOOKS

  const [likesHook, setLikes] = useState(likes.length);

  function handleLikes(e)
  {
      // TOGGLE LIKE AND UNLIKE

      setLiked(pre => !pre);

      // UPDATE DATABASE FOR PERMANENT CHANGE

      dispatch(likePost(id,token))

      // IF USER HAS LIKED POST THEN DONT COUNT LIKE ELSE COUNT IT LIKES

      liked ? setLikes(pre => pre -1) : setLikes(pre => pre +1);
  }

  return (
    <div className="w-full flex flex-col gap-2 my-3 bg-card p-3 rounded-2xl relative">
      <img
        src={img}
        alt="post"
        className="w-full object-center max-h-[25rem] rounded-2xl"
      />
      <div className="flex gap-3">
        <img
          src={liked ? like : notlike}
          alt="like"
          className="cursor-pointer"
          onClick={handleLikes}
        />
        <img
          src={comment}
          alt="comment"
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <img src={share} alt="share" className="cursor-pointer" />
      </div>

      <span>{likesHook} likes</span>

      {isOpen ? (
        <>
          <CommentsBlock />
        </>
      ) : (
        <div className="flex flex-col">
          <span className="font-black">{name}</span>
          <span>{description}</span>
        </div>
      )}
    </div>
  );
}
