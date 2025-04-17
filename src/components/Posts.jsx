import React, { useEffect } from "react";
import Input from "./Input";
import NewsFeed from "./NewsFeed";
import { useDispatch, useSelector } from "react-redux";
import { timelinePosts } from "../REDUX/postReducer";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";

export default function Posts() {
  const dispatch = useDispatch();

  // GET CURRENT USER

  const { user, token } = useSelector((state) => state.auth);

  const { posts, loading , added, results } = useSelector((state) => state.posts);

  useEffect(() => {

     if(posts.length === 0) dispatch(timelinePosts(token));

     if(added) dispatch(timelinePosts(token));

  }, [added]);


  return (
    <div className="h-screen w-full flex flex-col  items-center overflow-auto">
      <PeopleYouMayKnow />
      <Input  user={user} token={token} />
      <NewsFeed posts={posts} token={token} status={loading} user={user} results={results} />
    </div>
  );
}
