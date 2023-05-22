import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getJson } from "../api/api";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { changeModal } from "../modules/header";
import { getFormatDate, getFormatTime } from "../modules/common";
import { setFriendList, setChatingList } from "../modules/home";
import { isError } from "../modules/common";
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

const TalkItem = ({ room, navigate }) => {
  const { room_id, title, content, sended_time } = room;

  const date = sended_time !== null ? new Date(sended_time) : null;
  const onClickChat = () => {
    navigate(`/chat?room_id=${room_id}&title=${title}`);
  };

  return (
    <div className="talkItem" onClick={onClickChat}>
      <div className="image"></div>
      <div className="mid">
        <div className="name">{title}</div>
        <div className="text">{content}</div>
      </div>
      <div className="datetime">
        {date !== null && (
          <div className="date">{getFormatDate(date.getFullYear(), date.getMonth(), date.getDate())}</div>
        )}
        {date !== null && <div className="time">{getFormatTime(date.getHours(), date.getMinutes())}</div>}
      </div>
    </div>
  );
};

const Home = ({ friendList, chatingList, changeModal, setFriendList, setChatingList }) => {
  const navigate = useNavigate();

  const [openFriends, setOpenFriends] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  useEffect(() => {
    getJson("/member/check").then((result) => {
      if (result["error"]) {
        alert("ログインからしてください。");
        navigate("/login");
      } else {
        getJson("/friend").then((result) => {
          isError(navigate, result["error"]);
          setFriendList(result);
        });

        getJson("/room/getRoomId").then((result) => {
          isError(navigate, result["error"]);
          console.log(result);
          setChatingList(result);
        });
      }
    });
  }, []);

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
        {chatingList.map((chat, index) => (
          <TalkItem room={chat} key={index} navigate={navigate}></TalkItem>
        ))}
      </div>
    </div>
  );
};

export default connect(({ home }) => ({ friendList: home.friendList, chatingList: home.chatingList }), {
  changeModal,
  setFriendList,
  setChatingList,
})(Home);
