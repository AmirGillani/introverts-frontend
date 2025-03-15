import React, { useState } from "react";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import comment from "../assets/img/comment.png";
import share from "../assets/img/share.png";
import CommentsBlock from "./Comments";
export default function Post({ name, description, likes, liked, img }) {
  const [isOpen, setIsOpen] = useState(false);

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
        />
        <img
          src={comment}
          alt="comment"
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <img src={share} alt="share" className="cursor-pointer" />
      </div>

      <span>{likes} likes</span>

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
