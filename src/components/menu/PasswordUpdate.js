import PreButton from "../common/PreButton";
import { useState, useEffect } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../css/Form.scss";

const PasswordUpdate = () => {
  const navigate = useNavigate();

  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState(false);
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    if (nowPassword !== "" && newPassword !== "" && newPasswordAgain !== "")
      setActivate(true);
    else setActivate(false);
  }, [nowPassword, newPassword, newPasswordAgain]);

  const onNowChange = (e) => {
    setNowPassword(e.target.value);
  };

  const onNewChange = (e) => {
    setNewPassword(e.target.value);
  };

  const onNewAgainChange = (e) => {
    setNewPasswordAgain(e.target.value);
  };

  const onPreClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pwResetPage">
      <PreButton />
      <div className="title">パスワード再登録</div>
      <div className="subtitle">
        <p>パスワードを変更すると、</p>
        <p>自動的にログアウトされます。</p>
        <p>新しいパスワードで再度ログインして下さい。</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className="key">現在のパスワード</div>
          <input onChange={onNowChange} />
        </div>
        <div className="inputBox">
          <div className="key">新しいパスワード</div>
          <input onChange={onNewChange} />
        </div>
        <div className="inputBox">
          <div className="key">新しいパスワード（確認）</div>
          <input onChange={onNewAgainChange} />
        </div>
        <div className="btnBox">
          <button className="preBtn" onClick={onPreClick}>
            戻る
          </button>
          <button className={`nextBtn ${activate ? "" : "noActivate"}`}>
            <p>次に</p>
            <MdOutlineArrowCircleRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdate;
