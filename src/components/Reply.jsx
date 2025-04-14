import React from "react";

export default function Reply({ img, name, reply,user }) {
  return (
    <div id="reply">
      <div className="w-full flex gap-2 ml-16 mt-1">
        <img src={img} alt="img" className="w-10 rounded-full h-10" />
        <div className="md:w-[60%] w-[40%] flex flex-col">
          <span className="text-black font-semibold">{name}</span>
          <span className="bg-input-color p-1 rounded-xl">{reply}</span>
        </div>
      </div>
    </div>
  );
}
