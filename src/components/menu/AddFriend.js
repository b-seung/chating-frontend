import { useState, useRef, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PreButton from "../common/PreButton";
import "../../css/AddFriend.scss";
import { getJson, postData } from "../../api/api";
import ChatOrManage from "../common/ChatOrManage";
import { isError } from "../../modules/common";
import { useNavigate } from "react-router-dom";
import { setMyList, addMyList, removeMyList, setAddedList, setIsMe, setIsAdded } from "../../modules/addFriend";

const Failed = () => {
  return (
    <div className="failedItem">
      <p>入力したIDと一致する会員がいません。</p>
      <p>IDを確認してもう一度検索してください。</p>
    </div>
  );
};

const Successed = ({ friend, isMe, isAdded, setIsAdded, onAdd }) => {
  const onAddClick = () => {
    const result = onAdd(friend);

    if (result) {
      setIsAdded(true);
    } else {
      alert("エラーが発生しました。\nもう一度やり直してください。");
    }
  };

  return (
    <div className="successItem">
      <div className="image"></div>
      <div className="name">{friend.nickname}</div>
      {!isMe &&
        (isAdded ? (
          <ChatOrManage id={friend.id}></ChatOrManage>
        ) : (
          <button className="addBtn" onClick={() => onAddClick()}>
            追加する
          </button>
        ))}
    </div>
  );
};

const AddedFriend = ({ data, onAdd, onDelete }) => {
  const [isAdd, setIsAdd] = useState(false);

  const onAddClick = () => {
    const result = onAdd(data);

    if (result) {
      setIsAdd(true);
    } else {
      alert("エラーが発生しました。\nもう一度やり直してください。");
    }
  };

  const onCancelClick = () => {
    const result = onDelete(data);

    if (result) {
      setIsAdd(false);
    } else {
      alert("エラーが発生しました。\nもう一度やり直してください。");
    }
  };

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

const AddFriend = ({
  myFriendList,
  addedMeList,
  isMe,
  isAdded,
  setMyList,
  addMyList,
  removeMyList,
  setAddedList,
  setIsMe,
  setIsAdded,
}) => {
  const navigate = useNavigate();

  const [isSearched, setIsSearched] = useState(false);
  const [searchFriend, setSearchFriend] = useState({ id: null, nickname: null });
  const searchId = useRef(null);

  useEffect(() => {
    getJson(`/friend/friendsList`).then((result) => {
      isError(navigate, result["error"]);
      console.log(result);
      setAddedList(result["addedList"]);
      setMyList(result["myFriendList"]);
    });
  }, []);

  const onAddFriend = useCallback(
    (data) => {
      const result = postData("/friend/addFriend", { id: data.id }).then((result) => {
        console.log(result);
        if (result["error"]) return false;
        addMyList(data);
        if (searchFriend.id === data.id) setIsAdded(true);
        return true;
      });

      return result;
    },
    [searchFriend]
  );

  const onDeleteFriend = useCallback(
    (data) => {
      const result = postData("/friend/deleteFriend", { id: data.id }).then((result) => {
        if (result["error"]) return false;
        removeMyList(data);
        if (searchFriend.id === data.id) setIsAdded(false);
        return true;
      });
      return result;
    },
    [searchFriend]
  );

  const onSearch = (e) => {
    e.preventDefault();

    if (!isSearched) setIsSearched(true);
    if (isAdded) setIsAdded(false);

    getJson(`/member/searchId?id=${searchId.current.value}`).then((result) => {
      console.log(result);
      setIsMe(result["isMyId"]);
      setSearchFriend({
        id: result["id"],
        nickname: result["nickname"],
      });

      for (let list of myFriendList) {
        if (list["id"] === result["id"]) {
          setIsAdded(true);
          break;
        }
      }
    });
  };

  return (
    <div className="addFriendPage">
      <PreButton />
      <div className="title">友達追加</div>
      <form className="searchBox" onSubmit={onSearch}>
        <input ref={searchId} placeholder="IDを入力してください。" />
        <button className="searchBtn" type="submit">
          検索
        </button>
      </form>
      {isSearched &&
        (searchFriend["id"] !== null ? (
          <Successed
            friend={searchFriend}
            isMe={isMe}
            isAdded={isAdded}
            setIsAdded={setIsAdded}
            onAdd={onAddFriend}
          ></Successed>
        ) : (
          <Failed></Failed>
        ))}
      <div className="addBox">
        <div className="addTitle">知り合いかも</div>
        <div className="addList">
          {addedMeList !== null &&
            addedMeList.map((data, index) => {
              return <AddedFriend data={data} key={index} onAdd={onAddFriend} onDelete={onDeleteFriend}></AddedFriend>;
            })}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ addFriend }) => ({
    myFriendList: addFriend.myFriendList,
    addedMeList: addFriend.addedMeList,
    isMe: addFriend.isMe,
    isAdded: addFriend.isAdded,
  }),
  { setMyList, addMyList, removeMyList, setAddedList, setIsMe, setIsAdded }
)(AddFriend);
