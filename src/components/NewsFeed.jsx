import React from "react";
import Post from "./Post";

export default function NewsFeed({ posts, user, token,results,status }) {
  
  return (
    <div className="w-[80%] relative z-10">
      {status === "loading" ? (
        <div className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
          Loading...
        </div>
      ) : results.length > 0 ? (
        results.map((post, index) => (
          <Post
            name={post.name}
            description={post.desc}
            likes={post.likes}
            user={user}
            img={post.image}
            type={post.type}
            id={post._id}
            key={index}
            token={token}
            userID={post.userID}
          />
        ))
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            name={post.name}
            description={post.desc}
            likes={post.likes}
            user={user}
            img={post.image}
            type={post.type}
            id={post._id}
            key={index}
            token={token}
            userID={post.userID}
          />
        ))
      ) : (
        <h2 className="text-4xl text-orange-500 text-center my-5">NO POSTS</h2>
      )}
    </div>
  );
}
