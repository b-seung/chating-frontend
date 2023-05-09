import { useState, useRef } from "react";
import PreButton from "../common/PreButton";
import "../../css/AddFriend.scss";
import { friendsTableTest, loginTableTest } from "../../api/test";
import ChatOrManage from "../common/ChatOrManage";

const Failed = () => {
  return (
    <div className="failedItem">
      <p>入力したIDと一致する会員がいません。</p>
      <p>IDを確認してもう一度検索してください。</p>
    </div>
  );
};

const Successed = ({ friend, isAdd }) => {
  const [isAdded, setIsAdded] = useState(isAdd);

  const onAddClick = () => {
    setIsAdded(true);
  };
  return (
    <div className="successItem">
      <div className="image"></div>
      <div className="name">{friend.nickname}</div>
      {isAdded ? (
        <ChatOrManage id={friend.id}></ChatOrManage>
      ) : (
        <button className="addBtn" onClick={onAddClick}>
          追加する
        </button>
      )}
    </div>
  );
};

const AddedFriend = ({ data }) => {
  const [isAdd, setIsAdd] = useState(false);

  const onAddClick = () => setIsAdd(true);

  const onCancelClick = () => setIsAdd(false);

  return (
    <div className="addedItem">
      <div className="image"></div>
      <div className="name">{data.nickname}</div>
      {isAdd ? (
        <button className="cancelBtn" onClick={onCancelClick}>
          キャンセル
        </button>
      ) : (
        <button className="addBtn" onClick={onAddClick}>
          ＋追加
        </button>
      )}
    </div>
  );
};

const AddFriend = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchFriend, setSearchFriend] = useState(null);

  const searchId = useRef(null);
  const isFriends = friendsTableTest.isFriends("test1");

  const onSearch = () => {
    if (!isSearched) setIsSearched(true);

    setSearchResult(loginTableTest.checkId(searchId.current.value));
    setSearchFriend({
      id: searchId.current.value,
      nickname: searchId.current.value,
    });
  };

  return (
    <div className="addFriendPage">
      <PreButton />
      <div className="title">友達追加</div>
      <div className="searchBox">
        <input ref={searchId} placeholder="IDを入力してください。" />
        <button className="searchBtn" onClick={onSearch}>
          検索
        </button>
      </div>
      {isSearched && (searchResult ? <Successed friend={searchFriend} isAdd={false}></Successed> : <Failed></Failed>)}
      <div className="addBox">
        <div className="addTitle">知り合いかも</div>
        <div className="addList">
          {isFriends.map((data) => {
            return <AddedFriend data={data} key={data.id}></AddedFriend>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
