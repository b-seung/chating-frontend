import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { chatTableTest, friendsTableTest, loginTableTest } from "../api/test";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "../css/Home.scss";

const FriendItem = ({ nickname }) => {
  return (
    <div className="friendItem">
      <div className="image"></div>
      <div className="name">{nickname}</div>
    </div>
  );
};

const TalkItem = ({ chat }) => {
  const { id, text, datetime } = chat;
  const date = new Date(datetime).getDate();
  const time = new Date(datetime).getTime();
  return (
    <>
      <div className="image"></div>
      <div className="mid">
        <div className="name">{id}</div>
        <div className="text">{text}</div>
      </div>
      <div className="datetime">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </div>
    </>
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

  console.log(friendsList);
  const chatsList = chatTableTest.getList();

  return (
    <div className="homePage">
      <div className="title">
        <div>友達リスト</div>
        {openFriends ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
      <div className="friendsBox">
        {friendsList.map((friend, index) => (
          <FriendItem nickname={friend} key={index}></FriendItem>
        ))}
      </div>
      <div className="title">
        <div>チャットリスト</div>
        {openChat ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
      <div className="chatsBox">
        {/* {chatsList.forEach((chat) => {
          return <TalkItem chat={chat}></TalkItem>;
        })} */}
      </div>
    </div>
  );
};

export default connect(({ login }) => ({ loginId: login.id }))(Home);
