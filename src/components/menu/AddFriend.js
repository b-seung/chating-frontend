import { useState, useRef, useEffect } from "react";
import PreButton from "../common/PreButton";
import "../../css/AddFriend.scss";
import { getJson } from "../../api/api";
import { friendsTableTest, loginTableTest } from "../../api/test";
import ChatOrManage from "../common/ChatOrManage";
import { isError } from "../../modules/common";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [myId, setMyId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [myFirendList, setMyFriendList] = useState(null);
  const [addedMe, setAddedMe] = useState(null); //知り合いかもList
  const [searchResult, setSearchResult] = useState(null);
  const [searchFriend, setSearchFriend] = useState(null);

  const searchId = useRef(null);

  useEffect(() => {
    getJson("/member/check").then((result) => {
      isError(navigate, result["error"]);
      setMyId(result["id"]);
    });

    getJson("");
    getJson("/friend/addedMe").then((result) => {
      isError(navigate, result["error"]);
      setAddedMe(result);
    });
  }, []);

  const onSearch = () => {
    if (!isSearched) setIsSearched(true);

    getJson();
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
      {isSearched &&
        (searchResult ? <Successed myId={myId} friend={searchFriend} isAdd={false}></Successed> : <Failed></Failed>)}
      <div className="addBox">
        <div className="addTitle">知り合いかも</div>
        <div className="addList">
          {addedMe !== null &&
            addedMe.map((data) => {
              return <AddedFriend data={data} key={data}></AddedFriend>;
            })}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
