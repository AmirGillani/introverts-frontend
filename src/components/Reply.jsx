import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply, allComments } from "../REDUX/postReducer";

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

  // const handleEdit = (id) => {
  //   setActiveCommentID(id);

  //   const commentFound = comments.find((comment) => comment._id === id);

  //   if (commentFound?.comment) setText3(commentFound.comment);

  //   setEdit(true);
  // };

  // const submitEdit = () => {
  //   dispatch(editComment(text3, id, activeCommentID, token, user._id)).then(
  //     () => {
  //       dispatch(allComments(id, token));
  //       setText3("");
  //     }
  //   );
  // };

  const handleDelete = (replyId) => {
    dispatch(deleteReply(postID, commentID, replyId, token)).then(() => {
      dispatch(allComments(postID, token));
    });
  };

  return (
    <div id="reply">



      <div className="w-full flex gap-2 ml-16 mt-1">
        <img src={img} alt="img" className="w-10 rounded-full h-10" />
        <div className="md:w-[60%] w-[40%] flex flex-col">
          <span className="text-black font-semibold">{name}</span>
          <span className="bg-input-color p-1 rounded-xl">{reply}</span>
          {user._id === userID && (
            <span className="flex gap-1 w-[50%] justify-start items-start text-gray-500 cursor-pointer font-semibold text-xs">
              <span onClick={()=>handleReplyEdit(postID,commentID,id,reply)}>Edit</span>
              <span onClick={() => handleDelete(id)}>Delete</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
