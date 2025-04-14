import React, { useEffect } from "react";

import Posts from "../components/Posts";

import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  const socket = io("https://introverts-backend.vercel.app");

  useEffect(() => {
    // Register user when component mounts
    socket.emit("register", user._id);

    // Listen for notifications
    socket.on("notification", (msg) => {
      alert(`🔔 Notification: ${msg}`);
    });

    // Cleanup on unmount
    return () => {
      socket.off("notification");
    };
  }, [user._id, socket]);

  return (
    <div>
      <Posts />
    </div>
  );
}
