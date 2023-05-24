import React, { createContext, useRef } from "react";
import SockJS from "sockjs-client";
import { connect } from "react-redux";
import { changeConnectState } from "../modules/loading";

export const WebSocketContext = createContext(null);

const SocketProvider = ({ children, changeConnectState }) => {
  const socketUrl = "/ws/chat";
  // const socket = new SockJS("/ws/chat", null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
  let ws = useRef(null);

  if (!ws.current) {
    changeConnectState(false);

    ws.current = new SockJS(socketUrl, null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
    ws.current.onopen = () => {
      console.log("connected to " + socketUrl);
      changeConnectState(true);
    };

    ws.current.onmessage = (e) => {
      const content = JSON.parse(e.data);
      const message = content.message;
      console.log(message);
    };

    ws.current.onclose = (error) => {
      console.log("disconnect from " + socketUrl);
      changeConnectState(false);
      console.log(error);
    };

    ws.current.onerror = (error) => {
      console.log("connection error " + socketUrl);
      changeConnectState(false);
      console.log(error);
    };
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

export default connect(({}) => ({}), { changeConnectState })(SocketProvider);
