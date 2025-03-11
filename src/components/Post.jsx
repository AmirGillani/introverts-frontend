import React from "react";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import comment from "../assets/img/comment.png";
import share from "../assets/img/share.png";

export default function Post({ name, description, likes, liked, img }) {
  return (
    <div className="w-full flex flex-col gap-2 my-3 bg-card p-3 rounded-2xl relative">
      <img src={img} alt="post" className="w-full object-center max-h-[25rem] rounded-2xl" />
      <div className="flex gap-3">
        <img src={liked ? like : notlike} alt="like" />
        <img src={comment} alt="comment" />
        <img src={share} alt="share" />
      </div>

      <span>{likes} likes</span>

      <div className="flex flex-col">
        <span className="font-black">{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
