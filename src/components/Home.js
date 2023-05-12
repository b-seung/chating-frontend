import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getFormatDate, getFormatTime } from "../modules/common";
import { getJson } from "../api/api";
import { chatTableTest, friendsTableTest, loginTableTest } from "../api/test";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { changeModal } from "../modules/header";

import "../css/Home.scss";

const FriendItem = ({ nickname, openModal, navigate }) => {
  const onClickFriend = () => {
    openModal();
    navigate(`.?id=${nickname}`);
  };

  return (
    <div className="friendItem" onClick={onClickFriend}>
      <div className="image"></div>
      <div className="name">{nickname}</div>
    </div>
  );
};

const TalkItem = ({ chat, navigate }) => {
  const { id, text } = chat;
  const date = new Date(chat.datetime);

  const onClickChat = () => {
    navigate(`/chat?id=${id}`);
  };

  return (
    <div className="talkItem" onClick={onClickChat}>
      <div className="image"></div>
      <div className="mid">
        <div className="name">{id}</div>
        <div className="text">{text}</div>
      </div>
      <div className="datetime">
        <div className="date">{getFormatDate(date.getFullYear(), date.getMonth(), date.getDate())}</div>
        <div className="time">{getFormatTime(date.getHours(), date.getMinutes())}</div>
      </div>
    </div>
  );
};

const Home = ({ loginState, changeModal }) => {
  const navigate = useNavigate();

  const [openFriends, setOpenFriends] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  const [friends, setFriends] = useState(new Array());

  useEffect(() => {
    if (!loginState) {
      if (!alert("ログインからしてください。")) navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (loginId === null) {
  //     if (!alert("ログインしてください。")) document.location = "/login";
  //   }
  // });

  getJson("/friend/friends").then((result) => setFriends(result));

  const chatsList = chatTableTest.getList();

  const openFriendsList = () => {
    setOpenFriends(!openFriends);
  };

  const openChatsList = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className="homePage">
      <div className="title" onClick={openFriendsList}>
        <div>友達リスト</div>
        {openFriends ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
      <div className={`friendsBox ${openFriends ? "" : "hidden"}`}>
        {friends.map((friend, index) => (
          <FriendItem nickname={friend} openModal={changeModal} navigate={navigate} key={index}></FriendItem>
        ))}
      </div>
      <div className={`title ${openFriends && "chattitle"}`} onClick={openChatsList}>
        <div>チャットリスト</div>
        {openChat ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
      <div className={`chatsBox ${openChat ? "" : "hidden"}`}>
        {chatsList.map((chat, index) => (
          <TalkItem chat={chat} key={index} navigate={navigate}></TalkItem>
        ))}
      </div>
    </div>
  );
};

export default connect(({ login }) => ({ loginState: login.loginState }), { changeModal })(Home);
