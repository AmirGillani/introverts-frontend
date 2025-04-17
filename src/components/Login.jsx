import React ,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../REDUX/authReducer";

export default function Signup({ toggle }) {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { validationErrors,status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  
  const getErrorMessage = (fieldName) => {
    const error = validationErrors.find((error) => error.path === fieldName);
    return error ? error.msg : null;
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative z-10">
      <div className="w-[70%] bg-white rounded-2xl py-3 px-2 flex flex-col gap-2 justify-center items-center">
        <span className="font-bold text-black text-xl my-6">Login</span>

        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-1">
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

          <div className="w-full flex flex-col gap-1">
            <input
              type="password"
              className="bg-input-color p-2.5 rounded-lg w-full outline-none"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            {getErrorMessage("password") && (
            <span className="text-red-500 text-sm">
              {getErrorMessage("password")}
            </span>
          )}
          </div>
          


          <span className="text-black my-3 md:text-sm text-xs self-center" onClick={() => toggle()}>
          Don't Have A Account ?{" "}
          <span className="cursor-pointer hover:underline hover:text-blue-600">
            Signup !!
          </span>
        </span>
        {
          status === "loading" ?<button className="self-center bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24" type="submit" disabled={true}>
          Loading
        </button>:<button className="self-center bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white p-1 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange w-24" type="submit">
          Login
        </button>
        }
        
        </form>

      </div>
    </div>
  );
}
