import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {editProfile} from "../REDUX/authReducer";

export default function Modal({ close }) {

  const dispatch = useDispatch();

  const {user,token} = useSelector(state=>state.auth);

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
    firstName: user.firstName,
    lastName: user.lastName,
    worksAt: user.worksAt,
    livesIn: user.livesIn,
    relationship: user.relationship,
    profilePic: null,
    coverPic: null,
  });

  function handleChange(e) {

    const { name, value, files } = e.target; // Destructure for cleaner code

    const newValue = files ? files[0] : value; 

    setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
    }));
}


  function handleSubmit(e)
  {
   e.preventDefault();

   const newFormData = new FormData();;
   newFormData.append("firstName",formData.firstName);
   newFormData.append("lastName",formData.lastName);
   newFormData.append("livesIn",formData.livesIn);
   newFormData.append("relationship",formData.relationship);
   newFormData.append("worksAt",formData.worksAt);
   if(formData.coverPic) newFormData.append("coverPic",formData.coverPic);
   if(formData.profilePic) newFormData.append("profilePic",formData.coverPic);

  dispatch(editProfile(newFormData,token,user._id))

  close();
  }

  return (
    <div className="w-screen h-[100%] bg-black/80  inset-0 absolute z-20 flex justify-center items-start">
      <motion.div
        className="bg-white rounded-xl py-3 px-10 flex flex-col gap-2 md:mt-10 mt-20 justify-center items-center relative z-30"
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
          <div className="flex md:flex-row flex-col gap-3">
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Works at"
              name="worksAt"
              value={formData.worksAt}
              onChange={handleChange}
            />
          </div>

          <div className="flex md:flex-row flex-col gap-3">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg outline-none w-full"
              placeholder="Lives in"
              name="livesIn"
              value={formData.livesIn}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Relationship status"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span>Profile Image</span>
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                
                className="bg-input-color p-2.5 rounded-lg outline-none w-24 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Cover Image</span>
              <input
                type="file"
                name="coverPic"
                
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
