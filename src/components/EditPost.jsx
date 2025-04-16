import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { editPost,timelinePosts } from "../REDUX/postReducer";

export default function Modal({ close, id, description }) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  // ANIMATIONS RELATED LOGIC

  // Disable scrolling on the body when modal is open
  useEffect(() => {
    // Add the overflow-hidden class to the body when the modal is opened
    document.body.style.overflow = "hidden";

    // Clean up by removing the overflow-hidden class when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures it runs only once when the modal is mounted

  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // FORMDATA LOGICS

  const [formData, setFormData] = useState({
    image: null,
    desc: description.trim() !== 0 ? description : "",
    type:""
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    let newValue = files ? files[0] : value;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: newValue,
      };

      if (files && files[0]) {
        const fileType = files[0].type;
        if (fileType.startsWith("image/")) {
          updatedData.type = "image";
        } else if (fileType.startsWith("video/")) {
          updatedData.type = "video";
        }
      }

      return updatedData;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("desc", formData.desc);

    if (formData.image) newFormData.append("image", formData.image);

    if (formData.type.trim() !== 0) newFormData.append("type", formData.type);

    dispatch(editPost(newFormData,id,token)).then(()=>window.location.reload("/"));

    close();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center w-screen h-screen">
      <motion.div
        className="bg-white rounded-xl py-3 px-10 flex flex-col gap-2 md:mt-10 mt-20 justify-center items-center relative z-60"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span
          className="self-end font-semibold text-black cursor-pointer"
          onClick={() => close()}
        >
          X
        </span>
        <span className="font-semibold py-6 text-xl">Your Info</span>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span>Content</span>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="bg-input-color p-2.5 rounded-lg outline-none w-24 cursor-pointer"
              />
            </div>
          </div>
          <button
            className="bg-gradient-to-b m-auto from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24"
            type="submit"
          >
            Edit
          </button>
        </form>
      </motion.div>
    </div>
  );
}
