import React, { useState, useEffect } from "react";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import comment from "../assets/img/comment.png";
import share from "../assets/img/share.png";
import CommentsBlock from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../REDUX/postReducer";

export default function Post({
  name,
  description,
  type,
  likes,
  img,
  id
}) {

  const dispatch = useDispatch();

  const {token,user} = useSelector(state=>state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const hasLiked = likes.includes(user._id);
  const [liked, setLiked] = useState(hasLiked);
  const [likesHook, setLikes] = useState(likes.length);

  useEffect(() => {
    setLiked(likes.includes(user._id));
    setLikes(likes.length);
  }, [likes, user._id]);

  function handleLikes() {
    setLiked((pre) => !pre);
    dispatch(likePost(id, token));
    liked ? setLikes((pre) => pre - 1) : setLikes((pre) => pre + 1);
  }

  const ActionSection = (
    <>
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
    </>
  );

  const DescriptionBlock = (
    <div className="flex flex-col">
      <span className="font-black">{name}</span>
      <span
        className={`capitalize font-semibold ${
          type === "text" ? "text-3xl" : "text-base"
        }`}
      >
        {description}
      </span>
    </div>
  );
  

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 my-3 bg-card p-3 rounded-2xl relative">
        {/* Render based on post type */}
        {type === "image" && (
          <img
            src={img}
            alt="post"
            className="w-full object-center max-h-[25rem] rounded-2xl"
          />
        )}

        {type === "video" && (
          <video
            controls
            src={img}
            className="w-full max-h-[25rem] rounded-2xl"
          />
        )}

        {isOpen ? (
          <CommentsBlock id={id} user={user} />
        ) : (
          DescriptionBlock
        )}

        {ActionSection}
      </div>
    </>
  );
}
