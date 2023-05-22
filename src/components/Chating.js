import PreButton from "./common/PreButton";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SockJS from "sockjs-client";
import "../css/Chating.scss";

const DateItem = ({ date }) => {
  return <div className="date">{date}</div>;
};
const SendItem = () => {
  return (
    <div className="send">
      <div className="time">MM:ss</div>
      <div className="text">test</div>
    </div>
  );
};
const ReceiveItem = () => {
  return (
    <div className="receive">
      <div className="image" />
      <div className="text">test</div>
      <div className="time">MM:ss</div>
    </div>
  );
};
const Chating = () => {
  const [socket, setSocket] = useState(new SockJS("/ws/chat"));
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room_id");
  const title = searchParams.get("title");

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ chatRoomId: roomId, type: "JOIN" }));
    };

    return () => {
      // socket.onclose = () => {
      //   console.log("close");
      // };
    };
  }, []);

  return (
    <div className="chatPage">
      <PreButton />
      <div className="title">{title}</div>
      <div className="content">
        <DateItem date="2023-04-28" />
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
      </div>
    </div>
  );
};

export default Chating;
