import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { chatTableTest, friendsTableTest, loginTableTest } from "../api/test";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "../css/Home.scss";

const FriendItem = ({ nickname }) => {
  const onClickFriend = () => {};
  return (
    <Link to={`.?id=${nickname}`}>
      <div className="friendItem" onClick={onClickFriend}>
        <div className="image"></div>
        <div className="name">{nickname}</div>
      </div>
    </Link>
  );
};

const TalkItem = ({ chat }) => {
  const { id, text, datetime } = chat;
  const date = new Date(datetime).getDate();
  const time = new Date(datetime).getTime();
  return (
    <div className="talkItem">
      <div className="image"></div>
      <div className="mid">
        <div className="name">{id}</div>
        <div className="text">{text}</div>
      </div>
      <div className="datetime">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  );
};

const Home = ({ loginId }) => {
  const navigate = useNavigate();

  const [openFriends, setOpenFriends] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  // useEffect(() => {
  //   if (loginId === null) {
  //     if (!alert("ログインしてください。")) document.location = "/login";
  //   }
  // });

  const friendsList = friendsTableTest.getFriendsList(
    loginTableTest.test_login_id
  );

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
        {friendsList.map((friend, index) => (
          <FriendItem nickname={friend} key={index}></FriendItem>
        ))}
      </div>
      <div
        className={`title ${openFriends ? "chattitle" : ""}`}
        onClick={openChatsList}
      >
        <div>チャットリスト</div>
        {openChat ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
      <div className={`chatsBox ${openChat ? "" : "hidden"}`}>
        {chatsList.map((chat, index) => (
          <TalkItem chat={chat} key={index}></TalkItem>
        ))}
      </div>
    </div>
  );
};

export default connect(({ login }) => ({ loginId: login.id }))(Home);
