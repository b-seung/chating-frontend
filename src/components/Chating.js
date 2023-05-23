import PreButton from "./common/PreButton";
import { connect } from "react-redux";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { changeLoadingState } from "../modules/loading";
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
const Chating = ({ changeLoadingState }) => {
  const [socket, setSocket] = useState(
    new SockJS("/ws/chat", null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] })
  );
  const [connect, setConnect] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const input = useRef(null);

  const roomId = searchParams.get("room_id");
  const title = searchParams.get("title");

  useEffect(() => {
    changeLoadingState(true);
    socket.onopen = () => {
      setConnect(true);
      changeLoadingState(false);
      socket.send(JSON.stringify({ chatRoomId: roomId, type: "JOIN" }));
    };

    socket.onmessage = (e) => {
      const content = JSON.parse(e.data);
      const message = content.message;
      console.log(content);
      socket.close();
    };

    socket.onclose = () => {
      console.log("close");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({ chatRoomId: roomId, type: "SEND", message: input.current.value }));
    input.current.value = "";
  };

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
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
        <ReceiveItem></ReceiveItem>
        <SendItem></SendItem>
      </div>
      <form className="sendForm" onSubmit={sendMessage}>
        <input ref={input} />
        <MdOutlineSubdirectoryArrowLeft className="sendBtn" />
      </form>
    </div>
  );
};

export default connect(({}) => ({}), { changeLoadingState })(Chating);
