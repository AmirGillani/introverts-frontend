import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Modal({ close }) {
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
        <form className="flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-3">
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Works at"
            />
          </div>

          <div className="flex md:flex-row flex-col gap-3">
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Lives in"
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Country"
              />
            </div>
          </div>

          <div className="w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Relationship status"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span>Profile Image</span>
              <input
                type="file"
                className="bg-input-color p-2.5 rounded-lg outline-none w-24 cursor-pointer"
                placeholder="Lives in"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Cover Image</span>
              <input
                type="file"
                className="bg-input-color p-2.5 rounded-lg outline-none w-24 cursor-pointer"
                placeholder="Country"
              />
            </div>
          </div>
        </form>

        <button
          className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24"
          onClick={() => close()}
        >
          Edit
        </button>
      </motion.div>
    </div>
  );
}
