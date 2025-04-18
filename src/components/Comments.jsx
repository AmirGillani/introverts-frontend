import React, { useRef, useEffect, useState } from "react";
import share from "../assets/img/share.png";
import Reply from "./Reply";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  sendComment,
  editComment,
  editReply,
  deleteComment,
  allComments,
  sendReply,
} from "../REDUX/postReducer";

export default function CommentsBlock({ id }) {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { comments, status } = useSelector((state) => state.posts);

  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [editReplyText, setEditReplyText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isReplyEditing, setIsReplyEditing] = useState(false);

  const [activeCommentID, setActiveCommentID] = useState(null);
  const [activeReplyCommentID, setActiveReplyCommentID] = useState(null);
  const [editReplyIDs, setEditReplyIDs] = useState({
    replyID: null,
    commentID: null,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    dispatch(allComments(id, token));
  }, [id, token, dispatch]);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current?.focus();
  };

  const handleEdit = (commentId) => {
    const commentFound = comments.find((c) => c._id === commentId);
    if (commentFound) {
      setEditText(commentFound.comment);
      setActiveCommentID(commentId);
      setIsEditing(true);
      scrollToInput();
    }
  };

  const handleReplyEdit = (commentID, replyID, reply) => {
    setEditReplyText(reply);
    setEditReplyIDs({ commentID, replyID });
    setIsReplyEditing(true);
  };

  const handleCommentSubmit = () => {
    dispatch(sendComment(text, id, token, user._id)).then(() => {
      dispatch(allComments(id, token));
      setText("");
    });
  };

  const handleCommentEditSubmit = () => {
    dispatch(editComment(editText, id, activeCommentID, token, user._id)).then(
      () => {
        dispatch(allComments(id, token));
        setEditText("");
        setIsEditing(false);
      }
    );
  };

  const handleCommentDelete = (commentId) => {
    dispatch(deleteComment(id, commentId, token)).then(() => {
      dispatch(allComments(id, token));
    });
  };

  const handleReplySubmit = (commentID) => {
    dispatch(sendReply(commentID, id, token, replyText)).then(() => {
      dispatch(allComments(id, token));
      setReplyText("");
      setActiveReplyCommentID(null);
    });
  };

  const handleReplyEditSubmit = () => {
    const { commentID, replyID } = editReplyIDs;
    dispatch(
      editReply(editReplyText, id, commentID, token, user._id, replyID)
    ).then(() => {
      dispatch(allComments(id, token));
      setEditReplyText("");
      setIsReplyEditing(false);
    });
  };

  const renderCommentInput = () => (
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
          value={isEditing ? editText : text}
          onChange={(e) =>
            isEditing ? setEditText(e.target.value) : setText(e.target.value)
          }
        />
        {status === "loading" ? (
          "Wait ..."
        ) : (
          <img
            src={share}
            alt="share"
            className="cursor-pointer w-6 h-6"
            onClick={isEditing ? handleCommentEditSubmit : handleCommentSubmit}
          />
        )}
      </div>
    </div>
  );

  return (
    <div>
      {renderCommentInput()}
      <div className="rounded-b-2xl bg-white">
        {comments.map((comment) => (
          <div key={comment._id}>
            <div className="px-2 mt-0.5 grid md:grid-cols-[1fr_8fr_1fr] grid-cols-[1fr_5fr_1fr] gap-2 w-[90%] relative z-10">
              <Link to={`/user/${comment.userID}`}>
              <img
                src={comment.imgUrl}
                alt="profile"
                className="md:w-10 md:h-10 w-12 h-12 rounded-full"
              />
              </Link>
              
              <div className="w-full flex flex-col gap-1 justify-center items-center">
                <span className="text-sm font-semibold text-left w-full">
                  {comment.name}
                </span>
                <span className="w-full bg-input-color p-1 rounded-lg">
                  {comment.comment}
                </span>
                <span className="flex gap-0.5 self-start">
                  <span
                    className="text-sm text-gray-500 font-semibold cursor-pointer hover:text-gray-600"
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
                    <>
                      <span
                        className=" ml-2 text-sm text-gray-500 font-semibold cursor-pointer hover:text-gray-600"
                        onClick={() => handleEdit(comment._id)}
                      >
                        Edit
                      </span>
                      <span
                        className="ml-2 text-sm text-gray-500 font-semibold cursor-pointer hover:text-gray-600"
                        onClick={() => handleCommentDelete(comment._id)}
                      >
                        Delete
                      </span>
                    </>
                  )}

                  {comment.reply.length > 0 && (
                    <span
                      className="ml-2 text-sm text-gray-500 font-semibold cursor-pointer hover:text-gray-600"
                      onClick={() =>
                        setActiveReplyCommentID(
                          activeReplyCommentID === comment._id
                            ? null
                            : comment._id
                        )
                      }
                    >{`${comment.reply.length} replies`}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Reply Section */}
            {activeReplyCommentID === comment._id && (
              <div className="ml-16 mt-1">
                <div className="flex gap-2">
                  <img
                    src={user.profilePic}
                    alt="img"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="md:w-[60%] w-[40%] flex flex-col">
                    <input
                      type="text"
                      className="bg-input-color outline-none p-1 rounded-lg my-3"
                      placeholder="Reply..."
                      value={isReplyEditing ? editReplyText : replyText}
                      onChange={(e) =>
                        isReplyEditing
                          ? setEditReplyText(e.target.value)
                          : setReplyText(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          (isReplyEditing
                            ? editReplyText
                            : replyText
                          ).trim() !== ""
                        ) {
                          e.preventDefault();
                          isReplyEditing
                            ? handleReplyEditSubmit()
                            : handleReplySubmit(comment._id);
                        }
                      }}
                      enterKeyHint="send"
                    />
                  </div>
                </div>

                {comment.reply?.map((reply, index) => (
                  <Reply
                    key={index}
                    img={reply.img}
                    name={reply.name}
                    reply={reply.text}
                    id={reply._id}
                    postID={id}
                    commentID={comment._id}
                    userID={reply.userID}
                    user={user}
                    handleReplyEdit={() =>
                      handleReplyEdit(comment._id, reply._id, reply.text)
                    }
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
