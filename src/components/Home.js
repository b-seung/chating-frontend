import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getFormatDate, getFormatTime } from "../modules/common";
import { getJson } from "../api/api";
import { chatTableTest, friendsTableTest, loginTableTest } from "../api/test";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { changeModal } from "../modules/header";
import { setFriendList } from "../modules/home";
import "../css/Home.scss";

const FriendItem = ({ friend, openModal, navigate }) => {
  const onClickFriend = () => {
    openModal();
    navigate(`.?id=${friend.id}`);
  };

  return (
    <div className="friendItem" onClick={onClickFriend}>
      <div className="image"></div>
      <div className="name">{friend.nickname}</div>
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

const Home = ({ friendList, changeModal, setFriendList }) => {
  const navigate = useNavigate();

  const [openFriends, setOpenFriends] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  useEffect(() => {
    getJson("/member/check")
      .then((result) => {
        if (result["error"]) {
          alert("ログインからしてください。");
          navigate("/login");
        }
      })
      .then(() => {
        getJson("/friend")
          .then((result) => {
            setFriendList(result);
          })
          .catch((reason) => {
            alert("エラーが発生しました。\nログイン画面に戻ります。");
            navigate("/login");
          });
      });
  }, []);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (loginId === null) {
  //     if (!alert("ログインしてください。")) document.location = "/login";
  //   }
  // });

  // getJson("/friend/friends").then((result) => setFriends(result));

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
        {friendList.length === 0 && <div className="noFriend">ーーーーーなしーーーーー</div>}
        {friendList.map((friend, index) => (
          <FriendItem friend={friend} openModal={changeModal} navigate={navigate} key={index}></FriendItem>
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

export default connect(({ home }) => ({ friendList: home.friendList }), { changeModal, setFriendList })(Home);
