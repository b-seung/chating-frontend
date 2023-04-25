import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { chatTableTest, friendsTableTest, loginTableTest } from "../api/test";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';

const FriendItem = ({nickname}) => {
  return (
    <>
      <div className="image"></div>
      <div className="name">{nickname}</div>
    </>
  )
};

const TalkItem = ({chat}) => {
  const {myId, yourId, text, datetime} = chat;
  return (
    <>
      <div className="image"></div>
      <div className="mid">
        <div className="name">{nickname}</div>
        <div className="text">{text}</div>
      </div>
      <div className="datetime">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </div>
    </>
  )
};

const Home = ({ loginId }) => {
  const navigate = useNavigate();

  const [openFriends, setOpenFriends] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  useEffect(() => {
    if (loginId === null) {
      if (!alert("ログインしてください。")) document.location = "/login";
    }
  });

  const friendsList = friendsTableTest.getFriendsList(loginTableTest.test_login_id);
  const chatsList = chatTableTest.getChatList(loginTableTest.test_login_id);

  return (
  <div>
    <div>
    <div>友達リスト</div>
    {openFriends ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
    </div>
    <div>
      {friendsList.forEach(friend => {
        return <FriendItem nickname={friend}></FriendItem>
      })}
    </div>
    <div>
    <div>チャットリスト</div>
    {openChat ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
    </div>
    <div>
      {chatsList.forEach(chat => {
        return <TalkItem chat={chat}></TalkItem> 
      })}
    </div>
  </div>);
};

export default connect(({ login }) => ({ loginId: login.id }))(Home);
