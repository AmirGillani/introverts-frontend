import React, { useRef, useEffect, useState } from "react";
import profile from "../assets/img/profileImg.jpg";
import share from "../assets/img/share.png";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import Reply from "./Reply";
import { useDispatch, useSelector } from "react-redux";
import { sendComment, allComments, sendReply } from "../REDUX/postReducer";

export default function CommentsBlock({ id ,user}) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { comments, status } = useSelector((state) => state.posts);

  const [likedIndex, setLikedIndex] = useState(null);
  const [activeReplyCommentID, setActiveReplyCommentID] = useState(null);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    dispatch(allComments(id, token));
  }, [id, token, dispatch]);

  const handleLikeClick = (index) => {
    setLikedIndex(likedIndex === index ? null : index);
  };

  const submitComment = () => {
    const comment = { comment: text };
    dispatch(sendComment(comment, id, token)).then(() => {
      dispatch(allComments(id, token));
      setText("");
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
      {/* Comment Input */}
      <div className="bg-white rounded-t-2xl p-3 flex w-full gap-1 relative z-10">
        <img src={user.profilePic} alt="profile" className="w-12 h-12 rounded-full" />
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
            "Sending"
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

      {/* Comments & Replies */}
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
                <span
                  className="text-sm text-gray-500 font-semibold text-left w-full cursor-pointer hover:text-gray-600"
                  onClick={() =>
                    setActiveReplyCommentID(
                      activeReplyCommentID === comment._id ? null : comment._id
                    )
                  }
                >
                  Reply
                </span>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                {likedIndex === index ? (
                  <img
                    src={like}
                    alt="react"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleLikeClick(index)}
                  />
                ) : (
                  <img
                    src={notlike}
                    alt="react"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleLikeClick(index)}
                  />
                )}
                <span className="text-center text-sm text-gray-500">0</span>
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
