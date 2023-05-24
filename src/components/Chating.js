import PreButton from "./common/PreButton";
import { connect } from "react-redux";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { changeLoadingState } from "../modules/loading";
import { WebSocketContext } from "../socket/SocketProvider";
import "../css/Chating.scss";
import { getDateTime } from "../modules/common";

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
const Chating = ({ connectState }) => {
  const ws = useContext(WebSocketContext);
  const [kaiwa, setKaiwa] = useState(new Array());

  const input = useRef(null);
  const contentBox = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room_id");
  const title = searchParams.get("title");

  const date = new Date();
  const now = useCallback(() => {
    return getDateTime(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  }, []);

  useEffect(() => {
    if (connectState) ws.current.send(JSON.stringify({ chatRoomId: roomId, type: "JOIN", sendTime: now() }));

    return () => {
      if (connectState) ws.current.send(JSON.stringify({ chatRoomId: roomId, type: "LEAVE", sendTime: now() }));
    };
  }, [connectState]);

  useEffect(() => {
    contentBox.current.scrollTo(0, contentBox.current.clientHeight);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    ws.current.send(
      JSON.stringify({
        chatRoomId: roomId,
        type: "SEND",
        message: input.current.value,
        sendTime: now(),
      })
    );
    input.current.value = "";
  };

  return (
    <div className="chatPage">
      <PreButton />
      <div className="title">{title}</div>
      <div className="content" ref={contentBox}>
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
        <button type="submit">
          <MdOutlineSubdirectoryArrowLeft className="sendBtn" />
        </button>
      </form>
    </div>
  );
};

export default connect(({ loading }) => ({ connectState: loading.connectState }), { changeLoadingState })(Chating);
