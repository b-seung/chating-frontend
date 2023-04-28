import PreButton from "./common/PreButton";
import { useSearchParams } from "react-router-dom";
import "../css/Manage.scss";

const FriendManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="managePage">
      <PreButton />
      <div className="image" />
      <div className="name">{id}</div>
      <div className="menuBox">
        <div className="menu deleteHistory">チャット履歴を削除する。</div>
        <div className="menu deleteFriend"> 友達を削除する。</div>
      </div>
    </div>
  );
};

export default FriendManagement;
