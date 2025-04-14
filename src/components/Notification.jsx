import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const NotificationComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user?._id) return;

    // Initialize socket only once
    socketRef.current = io("https://introverts-backend.vercel.app");

    socketRef.current.emit("register", user._id);

    socketRef.current.on("notification", (msg) => {
      alert(`🔔 Notification: ${msg}`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user._id]);

  return <div>Listening for notifications...</div>;
};

export default NotificationComponent;
