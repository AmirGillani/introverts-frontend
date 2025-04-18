import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply, allComments } from "../REDUX/postReducer";
import { Link } from "react-router-dom";

export default function Reply({
  img,
  name,
  reply,
  user,
  id,
  userID,
  postID,
  commentID,
  handleReplyEdit
}) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);


  const handleDelete = (replyId) => {
    dispatch(deleteReply(postID, commentID, replyId, token)).then(() => {
      dispatch(allComments(postID, token));
    });
  };

  return (
    <div id="reply">



      <div className="w-full flex gap-2 ml-16 mt-1">
      <Link to={`/user/${userID}`}>
        <img src={img} alt="img" className="w-10 rounded-full h-10" />
        </Link>
        <div className="md:w-[60%] w-[40%] flex flex-col">
          <span className="text-black font-semibold">{name}</span>
          <span className="bg-input-color p-1 rounded-xl">{reply}</span>
          {user._id === userID && (
            <span className="flex justify-start items-start text-gray-500 cursor-pointer font-semibold text-xs">
              <span onClick={()=>handleReplyEdit(postID,commentID,id,reply)}>Edit</span>
              <span onClick={() => handleDelete(id)} className="ml-2">Delete</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
