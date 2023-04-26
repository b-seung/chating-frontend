import { useState } from "react";
import PreButton from "../common/PreButton";
import "../../css/AddFriend.scss";
import { friendsTableTest } from "../../api/test";

const Failed = () => {
  return (
    <div>
      <p>入力したIDと一致する会員がいません。</p>
      <p>IDを確認してもう一度検索してください。</p>
    </div>
  );
};

const Successed = ({ nickname }) => {
  return (
    <div className="successItem">
      <div className="image"></div>
      <div className="name">{nickname}</div>
      <button className="addBtn">追加する</button>
    </div>
  );
};

const AddedFriend = ({ data }) => {
  const [isAdd, setIsAdd] = useState(false);

  const onAddClick = () => {
    setIsAdd(true);
  };

  const onCancelClick = () => {
    setIsAdd(false);
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

const AddFriend = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [friend, setFriend] = useState(null);

  const isFriends = friendsTableTest.isFriends("test1");

  const onSearch = () => {
    if (!isSearched) setIsSearched(true);
  };

  return (
    <div className="addFriendPage">
      <PreButton />
      <div className="title">友達追加</div>
      <div className="searchBox">
        <input placeholder="IDを入力してください。" />
        <button className="searchBtn" onClick={onSearch}>
          検索
        </button>
      </div>
      {!isSearched ? (
        ""
      ) : searchResult ? (
        <Successed></Successed>
      ) : (
        <Failed></Failed>
      )}
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
