import "../css/Modal.scss";
import { MdClear } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatOrManage from "./common/ChatOrManage";

const FriendModal = ({ modal, openModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");

  const closeClick = (e) => {
    if (e.target !== e.currentTarget) return;

    openModal(false);
    navigate("/");
  };

  return (
    <div className={`modalPage ${modal ? "" : "close"}`} onClick={closeClick}>
      <div className="modalBox">
        <MdClear className="closeBtn" onClick={closeClick} />
        <div className="image" />
        <div className="name">{id}</div>
        <ChatOrManage openModal={openModal} id={id} />
      </div>
    </div>
  );
};

export default FriendModal;
