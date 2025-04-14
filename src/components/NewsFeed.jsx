import React from "react";
import Post from "./Post";


export default function NewsFeed({posts,user,token}) {


  return (
    <div className="w-[80%] relative z-10">
      
      {posts.length >0 
        ? posts.map((post, index) => {
          return (
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
            />
          );
        })
        : <h2 className="text-4xl text-gray-500 text-center">NO POSTS</h2>}
    </div>
  );
}
