import React from "react";
import { Posts } from "../assets/constants/Posts";
import Post from "./Post";
export default function NewsFeed() {
  return (
    <div className="w-[80%] relative z-10">
      {Posts.map((post) => {
        return (
          <Post
            name={post.name}
            description={post.description}
            likes={post.likes}
            liked={post.liked}
            img={post.img}
          />
        );
      })}
    </div>
  );
}
