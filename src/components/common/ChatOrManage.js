import { useNavigate } from "react-router-dom";
import { getJson } from "../../api/api";

const ChatOrManage = ({ openModal = null, id }) => {
  const navigate = useNavigate();

  const clickManage = () => {
    if (openModal !== null) openModal(false);
    navigate(`/management?id=${id}`);
  };

  const clickChat = () => {
    if (openModal !== null) openModal(false);

    getJson(`/room/clickChat?id=${id}`).then((result) => {
      console.log(result);
      navigate(`/chat?room_id=${result["room_id"]}&title=${result["title"]}&id=${id}`);
    });
  };
  return (
    <div className="buttonBox">
      <button className="chatBtn" onClick={clickChat}>
        チャット
      </button>
      <button className="manageBtn" onClick={clickManage}>
        管理
      </button>
    </div>
  );
};

export default ChatOrManage;
