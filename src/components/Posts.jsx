import React from "react";
import Input from "./Input";
import NewsFeed from "./NewsFeed";

export default function Posts() {
  return (
    <div className="h-screen w-full flex flex-col  items-center overflow-auto">
      <Input />
      <NewsFeed />
    </div>
  );
}
