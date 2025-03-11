import React, { useRef, useState } from "react";
import Profile from "../assets/img/profileImg.jpg";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import {Link} from "react-router-dom";

export default function Input() {
  const [imgURL, setImgURL] = useState(null);

  const imgRef = useRef(null);

  function uploadImg(e) {
    const img = e.target.files[0];

    if (img) {
      const imgURL = URL.createObjectURL(img);

      setImgURL(imgURL);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-3 flex w-[80%] justify-between relative z-10">
        <Link to={'/profile'}>
        <img src={Profile} alt="profile" className="w-12 h-12 rounded-full" />
        </Link>
        
        <div className="w-full px-2 flex flex-col">
          <input
            type="text"
            placeholder="What's happening"
            className="w-full h-10 bg-input-color p-1 rounded-lg outline-none"
          />
          <div className="flex justify-between w-full mt-2">
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => imgRef.current.click()}
            >
              <MdPhotoSizeSelectActual
                size={22}
                className="text-green-700 mr-1"
              />
              <span className="text-green-700">Photo</span>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <FaVideo size={22} className="text-purple-700 mr-1" />
              <span className="text-purple-700">Video</span>
            </div>
            <div className="md:flex hidden justify-center items-center cursor-pointer">
              <FaLocationDot size={22} className="text-red-700 mr-1" />
              <span className="text-red-700">Location</span>
            </div>
            <div className="md:flex hidden justify-center items-center cursor-pointer">
              <SlCalender size={22} className="text-yellow-700 mr-1" />
              <span className="text-yellow-700">Schedule</span>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <button className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white w-16 p-0.5 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange">
                Share
              </button>
            </div>

            <input
              type="file"
              name="img-upload"
              className="hidden"
              ref={imgRef}
              onChange={uploadImg}
            />
          </div>
        </div>
      </div>

      {imgURL && (
        <div className="relative mt-6">
          <MdCancel className="absolute top-1.5 left-1.5 text-white cursor-pointer" onClick={()=>setImgURL(null)} />
          <img src={imgURL} className="object-cover w-full max-h-[20rem] rounded-2xl" />
        </div>
      )}
    </>
  );
}
