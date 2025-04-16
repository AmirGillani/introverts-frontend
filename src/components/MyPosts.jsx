import React from "react";
import Post from "./Post";



export default function MyPosts({posts,user,token}) {



  return (
    <div className="w-[80%] overflow-auto h-[45%] relative z-10">
      
      {posts.length >0 
         ?  posts.map((post, index) => {
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
              userID={post.userID}
            />
          );
        })
        :  <h2 className="text-4xl text-orange-500 my-5 text-center">NO POSTS</h2>}
    </div>
  );
}
