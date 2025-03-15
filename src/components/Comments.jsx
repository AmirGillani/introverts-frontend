import React, { useRef, useEffect, useState } from "react";
import profile from "../assets/img/profileImg.jpg";
import share from "../assets/img/share.png";
import { Comments } from "../assets/constants/Comments";
import like from "../assets/img/like.png";
import notlike from "../assets/img/notlike.png";
import Reply from "./Reply";
export default function CommentsBlock() {
  const [likedIndex, setLikedIndex] = useState(null);

  const [replyIndex, setReplyIndex] = useState(false);

  const inputRef = useRef(null);

  // Focus on the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLikeClick = (index) => {
    // Toggle like for the specific comment using its index
    if (likedIndex === index) {
      setLikedIndex(null); // If it's already liked, unlike it
    } else {
      setLikedIndex(index); // Like the current comment
    }
  };

  return (
    <div>
      {/* INPUT */}

      <div className="bg-white rounded-t-2xl p-3 flex w-[100%] gap-1 relative z-10">
        <img src={profile} alt="profile" className="w-12 h-12 rounded-full" />
        <div className="w-[80%] px-2 flex gap-1 justify-center items-center">
          <input
            type="text"
            placeholder="What's happening"
            className="w-full h-10 bg-input-color p-1 rounded-lg outline-none"
            ref={inputRef}
          />
          <img src={share} alt="share" className="cursor-pointer w-6 h-6" />
        </div>
      </div>

      {/* COMMENTS */}

      <div className="rounded-b-2xl bg-white">
        {Comments.map((comment, index) => {
          return (
            <div>
              {/* COMMENT */}

              <div className="px-2 mt-0.5 grid md:grid-cols-[1fr_8fr_1fr] grid-cols-[1fr_5fr_1fr] gap-2 w-[90%]  relative z-10">
                <img
                  src={comment.imgUrl}
                  alt="profile"
                  className="md:w-10 md:h-10  w-12 h-12 rounded-full"
                />

                <div className="w-[100%] flex flex-col gap-1 justify-center items-center">
                  <span className="text-sm font-semibold text-left w-full">
                    {comment.name}
                  </span>

                  <span
                    type="text"
                    className="w-full bg-input-color p-1 rounded-lg outline-none"
                  >
                    {comment.comment}
                  </span>

                  <span
                    className="text-sm text-gray-500 font-semibold text-left w-full cursor-pointer hover:text-gray-600"
                    onClick={() => {
                      if (replyIndex == index) {
                        setReplyIndex(null);
                      } else {
                        setReplyIndex(index);
                      }
                    }}
                  >
                    Reply
                  </span>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                  {/* Show like or notlike based on whether the current comment is liked */}
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

                  <span
                    type="text"
                    className="text-center text-sm text-gray-500"
                  >
                    0
                  </span>
                </div>
              </div>

              {/* REPLIES */}

              {replyIndex === index && (
                <div>

                  {/* Reply Input */}
                  <div className="w-full flex gap-2 ml-16 mt-1">
                    <img
                      src={profile}
                      alt="img"
                      className="w-10 rounded-full h-10"
                    />
                    <div className="md:w-[60%] w-[40%] flex flex-col">
                      <input
                        type="text"
                        className="bg-input-color outline-none p-1 rounded-lg my-3"
                        placeholder="Reply.."
                        ref={inputRef}
                      />
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.reply.map((reply) => (
                  <Reply
                    img={reply.img}
                    name={reply.name}
                    reply={reply.reply}
                  />
                  ))}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
