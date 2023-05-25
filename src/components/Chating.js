import PreButton from "./common/PreButton";
import { connect } from "react-redux";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { changeLoadingState } from "../modules/loading";
import { setMessages, addMessage, changeSended } from "../modules/database";
import { WebSocketContext } from "../socket/SocketProvider";
import { getDateTime, isError } from "../modules/common";
import { getJson, postData } from "../api/api";
import "../css/Chating.scss";

const LoadItem = () => {
  return <div className="chatAnimation" />;
};

const DateItem = ({ date }) => {
  return <div className="date">{date}</div>;
};

const SendItem = ({ message }) => {
  const time = message["sended_time"].substring(11, 16);

  return (
    <div className="send">
      <div className="time">{message.sended === false ? <LoadItem></LoadItem> : time}</div>
      <div className="text">{message["content"]}</div>
    </div>
  );
};
const ReceiveItem = ({ message }) => {
  const time = message["sended_time"].substring(11, 16);

  return (
    <div className="receive">
      <div className="image" />
      <div className="text">{message["content"]}</div>
      <div className="time">{time}</div>
    </div>
  );
};
const Chating = ({ connectState, messages, setMessages, addMessage, changeSended }) => {
  const navigate = useNavigate();

  const ws = useContext(WebSocketContext);
  const [id, setId] = useState("");

  const input = useRef(null);
  const contentBox = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room_id");
  const title = searchParams.get("title");

  const now = useCallback(() => {
    const today = new Date();

    return getDateTime(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
      today.getMilliseconds()
    );
  }, []);

  useEffect(() => {
    if (connectState) ws.current.send(JSON.stringify({ chatRoomId: roomId, type: "JOIN", sendTime: now() }));

    return () => {
      if (connectState) ws.current.send(JSON.stringify({ chatRoomId: roomId, type: "LEAVE", sendTime: now() }));
    };
  }, [connectState]);

  useEffect(() => {
    getJson(`/room/getMessages?roomId=${roomId}`).then((result) => {
      console.log(result);
      isError(navigate, result["error"]);

      if (!result["error"]) {
        setMessages(result["messages"]);
        setId(result["id"]);
      }
    });
    return () => {
      setMessages(new Array());
    };
  }, []);

  useEffect(() => {
    contentBox.current.scrollTo(0, contentBox.current.clientHeight);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const nowDateTime = now();
    const text = input.current.value;

    addMessage({ room_id: roomId, from_id: id, content: text, sended_time: nowDateTime, sended: false });

    postData("/room/addMessage", {
      roomId: roomId,
      fromId: id,
      message: text,
      sendTime: nowDateTime,
    }).then((result) => {
      ws.current.send(
        JSON.stringify({
          chatRoomId: roomId,
          type: "SEND",
          fromId: id,
          message: text,
          sendTime: nowDateTime,
        })
      );

      changeSended(nowDateTime);
    });

    input.current.value = "";
  };

  return (
    <div className="chatPage">
      <PreButton />
      <div className="title">{title}</div>
      <div className="content" ref={contentBox}>
        {messages.map((message, index) => {
          const preDate = index === 0 ? "" : messages[index - 1]["sended_time"].substring(0, 10);
          const sendDate = message["sended_time"].substring(0, 10);
          return (
            <>
              {preDate !== sendDate ? <DateItem key={sendDate} date={sendDate} /> : ""}
              {id === message["from_id"] ? (
                <SendItem key={index} message={message} />
              ) : (
                <ReceiveItem key={index} message={message} />
              )}
            </>
          );
        })}
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

export default connect(
  ({ loading, database }) => ({
    connectState: loading.connectState,
    messages: database.messages,
  }),
  { changeLoadingState, setMessages, addMessage, changeSended }
)(Chating);
