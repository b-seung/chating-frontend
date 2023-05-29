import { useCallback } from "react";
import PreButton from "./common/PreButton";
import { useSearchParams, useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../css/Manage.scss";

const FriendManagement = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const onDeleteMessage = useCallback((id) => {
    postData("/room/deleteMessage", { id: id })
      .then((result) => {
        if (result["error"]) return false;
        return true;
      })
      .then((result) => {
        if (result) {
          alert(`${id}様とのメッセージを初期化しました。`);
          navigate("/");
        } else alert("エラーが発生しました。\nもう一度やり直してください。");
      });
  }, []);

  const onDeleteFriend = useCallback((id) => {
    postData("/friend/deleteFriend", { id: id })
      .then((result) => {
        if (result["error"]) return false;
        return true;
      })
      .then((result) => {
        if (result) navigate("/");
        else alert("エラーが発生しました。\nもう一度やり直してください。");
      });
  }, []);

  return (
    <div className="managePage">
      <PreButton />
      <div className="image" />
      <div className="name">{id}</div>
      <div className="menuBox">
        <div className="menu deleteHistory" onClick={() => onDeleteMessage(id)}>
          チャット履歴を削除する。
        </div>
        <div className="menu deleteFriend" onClick={() => onDeleteFriend(id)}>
          友達を削除する。
        </div>
      </div>
    </div>
  );
};

export default FriendManagement;
