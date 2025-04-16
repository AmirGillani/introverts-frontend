import React, { useEffect } from "react";

import Posts from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import {getAllUsers} from "../REDUX/authReducer";


export default function Home() {

  const dispatch = useDispatch();

  const {users} = useSelector(state=>state.auth)

  useEffect(()=>{
   if(users.length ==0) dispatch(getAllUsers())
  },[dispatch,users])

  return (
    <div>
      <Posts />
    </div>
  );
}
