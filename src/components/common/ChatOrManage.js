import { useNavigate } from "react-router-dom";

const ChatOrManage = ({ openModal = null, id }) => {
  const navigate = useNavigate();

  const clickManage = () => {
    if (openModal !== null) openModal(false);
    navigate(`/management?id=${id}`);
  };

  const clickChat = () => {
    if (openModal !== null) openModal(false);
    navigate(`/chat?id=${id}`);
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
