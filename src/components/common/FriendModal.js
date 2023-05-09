import "../../css/Modal.scss";
import { MdClear } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatOrManage from "./ChatOrManage";
import { connect } from "react-redux";
import { changeModal } from "../../modules/header";

const FriendModal = ({ modal, changeModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");

  const closeClick = (e) => {
    if (e.target !== e.currentTarget) return;

    changeModal();
    navigate("/");
  };

  return (
    <div className={`modalPage ${modal ? "" : "close"}`} onClick={closeClick}>
      <div className="modalBox">
        <MdClear className="closeBtn" onClick={closeClick} />
        <div className="image" />
        <div className="name">{id}</div>
        <ChatOrManage openModal={changeModal} id={id} />
      </div>
    </div>
  );
};

export default connect(({ header }) => ({ modal: header.modal }), { changeModal })(FriendModal);
