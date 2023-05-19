import { MdClear, MdSearch } from "react-icons/md";
import "../../css/Search.scss";
import { useState, useEffect } from "react";
import { chatTableTest } from "../../api/test";
import { connect } from "react-redux";
import { changeSearch } from "../../modules/header";

const FriendItem = ({ friend }) => {
  return (
    <div className="list">
      <div className="image" />
      <div className="name">{friend.id}</div>
    </div>
  );
};

const ChatItem = ({ chat }) => {
  return (
    <div className="list">
      <div className="image" />
      <div className="contentBox">
        <div className="name">{chat.id}</div>
        <div className="text">{chat.text}</div>
      </div>
    </div>
  );
};

const Search = ({ search, friendList, changeSearch }) => {
  const [checkValue, setCheckValue] = useState("友達");
  const [searchValue, setSearchValue] = useState("");

  const clickChat = (e) => setCheckValue("チャット");

  const clickFriend = (e) => setCheckValue("友達");

  const onChange = (e) => setSearchValue(e.target.value);

  return (
    <div className={`searchPage ${search ? "open" : "close"}`}>
      <form>
        <div className="topBox">
          <label>
            <input type="radio" name="type" value="友達" onChange={clickFriend} defaultChecked />
            友達
          </label>
          <label>
            <input type="radio" name="type" value="チャット" onChange={clickChat} />
            チャット
          </label>
          <MdClear className="closeBtn" onClick={changeSearch} />
        </div>
      </form>
      <div className="midBox">
        <MdSearch />
        <input value={searchValue} onChange={onChange} />
      </div>
      <div className="bottomBox">
        <div className="resultTitle">{checkValue}</div>
        {checkValue === "友達" && !friendList["error"]
          ? friendList.map((friend, index) => {
              if (friend.id.indexOf(searchValue) !== -1) {
                return <FriendItem key={index} friend={friend} />;
              }
            })
          : chatTableTest.getList().map((chat, index) => {
              if (chat.id.indexOf(searchValue) !== -1) {
                return <ChatItem key={index} chat={chat} />;
              }
            })}
      </div>
    </div>
  );
};

export default connect(
  ({ header, home }) => ({
    search: header.search,
    friendList: home.friendList,
  }),
  { changeSearch }
)(Search);
