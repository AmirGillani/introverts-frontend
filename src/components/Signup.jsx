import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../REDUX/authReducer";

export default function Signup({ toggle }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [confirm, setConfirm] = useState(false);

  const [img,setImg]= useState(null);

  const { validationErrors } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const uploadFile =(e)=>{
    setImg(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    newFormData.append("firstName",formData.firstName);

    newFormData.append("lastName",formData.lastName);

    newFormData.append("password",formData.password);

    newFormData.append("username",formData.username);

    newFormData.append("profilePic",img);


    if (formData.password !== formData.confirmPassword) setConfirm(true);
    else dispatch(signup(newFormData));
  };

  const getErrorMessage = (fieldName) => {
    const error = validationErrors.find((error) => error.path === fieldName);
    return error ? error.msg : null;
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative z-10">
      <div className="w-[80%] bg-white rounded-2xl py-3 px-2 flex flex-col gap-2 justify-center items-center">
        <span className="font-bold text-black text-xl my-6">Sign Up</span>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col gap-3">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
              />
              {getErrorMessage("firstName") && (
                <span className="text-red-500 text-sm">
                  {getErrorMessage("firstName")}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
              />
              {getErrorMessage("lastName") && (
                <span className="text-red-500 text-sm">
                  {getErrorMessage("lastName")}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Usernames"
              onChange={handleChange}
              name="username"
            />
            {getErrorMessage("username") && (
              <span className="text-red-500 text-sm">
                {getErrorMessage("username")}
              </span>
            )}
          </div>

          <div className="flex md:flex-row flex-col gap-3">
            <div>
              <input
                type="password"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
            </div>

            <div>
              <input
                type="password"
                className="bg-input-color p-2.5 rounded-lg outline-none"
                placeholder="Confirm Password"
                onChange={handleChange}
                name="confirmPassword"
              />
            </div>
          </div>

          {getErrorMessage("password") && (
            <span className="text-red-500 text-sm">
              {getErrorMessage("password")}
            </span>
          )}

          {confirm && (
            <span className="text-red-500 text-sm">
              Password and Confirm Pssword did'nt match
            </span>
          )}

          <div className="flex w-full md:flex-row flex-col gap-3">
            <div className="w-full">
              <input
                type="file"
                className="bg-input-color w-full p-2.5 rounded-lg outline-none"
                placeholder="Password"
                onChange={uploadFile}
                name="password"
                required
              />
            </div>

         
          </div>

         

          <span
            className="text-black my-3 md:text-sm text-xs self-center"
            onClick={() => toggle()}
          >
            Already Have A Account ?{" "}
            <span className="cursor-pointer hover:underline hover:text-blue-600">
              Login !!
            </span>
          </span>
          <button
            className="self-center bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
