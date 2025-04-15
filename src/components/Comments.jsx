import React, { useRef, useEffect, useState } from "react";
import share from "../assets/img/share.png";
import Reply from "./Reply";
import { useDispatch, useSelector } from "react-redux";
import { sendComment,editComment,deleteComment ,allComments, sendReply } from "../REDUX/postReducer";

export default function CommentsBlock({ id }) {
  const dispatch = useDispatch();
  const { token,user } = useSelector((state) => state.auth);
  const { comments, status } = useSelector((state) => state.posts);

  const [activeReplyCommentID, setActiveReplyCommentID] = useState(null);
  const [activeCommentID, setActiveCommentID] = useState(null);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [isEdit, setEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    dispatch(allComments(id, token));
  }, [id, token, dispatch]);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current?.focus(); // optional: focus the input
  };



  const handleEdit = (id) => {

    setActiveCommentID(id);

    const commentFound = comments.find((comment) => comment._id === id);

   if(commentFound?.comment) setText3(commentFound.comment);

    setEdit(true);
  };

  const submitEdit = () => {
    
    dispatch(editComment(text3,id, activeCommentID,token, user._id)).then(() => {
      dispatch(allComments(id, token));
      setText3("");
    });
  };

  const submitComment = () => {
    dispatch(sendComment(text, id, token, user._id)).then(() => {
      dispatch(allComments(id, token));
      setText("");
    });
  };

  const handleDelete = (commentId) => {
    
    dispatch(deleteComment(id, commentId,token)).then(() => {
      dispatch(allComments(id, token));
      
    });
  };



  const handleReplySubmit = (commentID, postID) => {
    dispatch(sendReply(commentID, postID, token, text2)).then(() => {
      dispatch(allComments(id, token));
      setText2("");
      setActiveReplyCommentID(null); // Optional: hide input after sending
    });
  };

  return (
    <div>
      {isEdit ? (
        <div className="bg-white rounded-t-2xl p-3 flex w-full gap-1 relative z-10">
          <img
            src={user.profilePic}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="w-[80%] px-2 flex gap-1 justify-center items-center">
            <input
              type="text"
              placeholder="What's happening"
              className="w-full h-10 bg-input-color p-1 rounded-lg outline-none"
              ref={inputRef}
              value={text3}
              onChange={(e) => setText3(e.target.value)}
            />
            {status === "loading" ? (
              "Wait ..."
            ) : (
              <img
                src={share}
                alt="share"
                className="cursor-pointer w-6 h-6"
                onClick={submitEdit}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-t-2xl p-3 flex w-full gap-1 relative z-10">
          <img
            src={user.profilePic}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="w-[80%] px-2 flex gap-1 justify-center items-center">
            <input
              type="text"
              placeholder="What's happening"
              className="w-full h-10 bg-input-color p-1 rounded-lg outline-none"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {status === "loading" ? (
              "Wait ..."
            ) : (
              <img
                src={share}
                alt="share"
                className="cursor-pointer w-6 h-6"
                onClick={submitComment}
              />
            )}
          </div>
        </div>
      )}

      <div className="rounded-b-2xl bg-white">
        {comments.map((comment, index) => (
          <div key={comment._id}>
            {/* COMMENT */}
            <div className="px-2 mt-0.5 grid md:grid-cols-[1fr_8fr_1fr] grid-cols-[1fr_5fr_1fr] gap-2 w-[90%] relative z-10">
              <img
                src={comment.imgUrl}
                alt="profile"
                className="md:w-10 md:h-10 w-12 h-12 rounded-full"
              />
              <div className="w-full flex flex-col gap-1 justify-center items-center">
                <span className="text-sm font-semibold text-left w-full">
                  {comment.name}
                </span>
                <span className="w-full bg-input-color p-1 rounded-lg outline-none">
                  {comment.comment}
                </span>
                <span className="flex md:w-[40%] w-[60%] md:gap-0 gap-0.5 self-start">
                  <span
                    className="text-sm text-gray-500 font-semibold text-left w-full cursor-pointer hover:text-gray-600"
                    onClick={() =>
                      setActiveReplyCommentID(
                        activeReplyCommentID === comment._id
                          ? null
                          : comment._id
                      )
                    }
                  >
                    Reply
                  </span>

                  {comment.userID === user._id && (
                    <span
                      className="text-sm text-gray-500 font-semibold text-left w-full cursor-pointer hover:text-gray-600"
                      onClick={() => {handleEdit(comment._id);scrollToInput()}}
                     
                    >
                      Edit
                    </span>
                  )}

                  {comment.userID === user._id && (
                    <span
                      className="text-sm text-gray-500 font-semibold text-left w-full cursor-pointer hover:text-gray-600"
                      onClick={() =>handleDelete(comment._id)}
                    >
                      Delete
                    </span>
                  )}
                </span>
              </div>
           
            </div>

            {/* REPLY SECTION */}
            {activeReplyCommentID === comment._id && (
              <div>
                {/* Reply Input */}
                <div className="w-full flex gap-2 ml-16 mt-1">
                  <img
                    src={user.profilePic}
                    alt="img"
                    className="w-10 rounded-full h-10"
                  />
                  <div className="md:w-[60%] w-[40%] flex flex-col">
                    <input
                      type="text"
                      className="bg-input-color outline-none p-1 rounded-lg my-3"
                      placeholder="Reply.."
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && text2.trim() !== "") {
                          e.preventDefault();
                          handleReplySubmit(comment._id, id);
                        }
                      }}
                      enterKeyHint="send"
                    />
                  </div>
                </div>

                {/* Replies */}
                {comment.reply?.map((reply, replyIndex) => (
                  <Reply
                    key={replyIndex}
                    img={reply.img}
                    name={reply.name}
                    reply={reply.text}
                    user={user}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
