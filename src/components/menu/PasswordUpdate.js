import PreButton from "../common/PreButton";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { changeLoadingState } from "../../modules/loading";
import { setLoginState } from "../../modules/login";
import { getJson, postText } from "../../api/api";
import "../../css/Form.scss";
import { isError } from "../../modules/common";

const PasswordUpdate = ({ setLoginState, changeLoadingState }) => {
  const navigate = useNavigate();

  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    if (nowPassword !== "" && newPassword !== "" && newPasswordAgain !== "") setActivate(true);
    else setActivate(false);
  }, [nowPassword, newPassword, newPasswordAgain]);

  const onNowChange = (e) => setNowPassword(e.target.value);

  const onNewChange = (e) => setNewPassword(e.target.value);

  const onNewAgainChange = (e) => setNewPasswordAgain(e.target.value);

  const onPreClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordAgain) {
      alert("入力されたパスワードが一致しません。\n確認してもう一度入力してください。");
      return;
    }

    changeLoadingState(true);

    getJson("/member/check").then((result) => {
      isError(navigate, result["error"]);

      if (nowPassword !== result["password"]) {
        alert("現在のパスワードが間違っています。\n確認してもう一度入力してください。");
        setNowPassword("");
        changeLoadingState(false);
        return;
      }

      postText("/member/passwordReset", { id: result["id"], password: newPassword }).then((result) => {
        changeLoadingState(false);
        alert("パスワードを再設定しました。\n再ログインしてください。");
        navigate("/login");
      });
    });
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
          <input onChange={onNowChange} value={nowPassword} />
        </div>
        <div className="inputBox">
          <div className="key">新しいパスワード</div>
          <input type="password" onChange={onNewChange} value={newPassword} />
        </div>
        <div className="inputBox">
          <div className="key">新しいパスワード（確認）</div>
          <input type="password" onChange={onNewAgainChange} value={newPasswordAgain} />
        </div>
        <div className="btnBox">
          <button className="preBtn" onClick={onPreClick}>
            戻る
          </button>
          <button className={`nextBtn ${!activate && "noActivate"}`}>
            <p>次に</p>
            <MdOutlineArrowCircleRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(({}) => ({}), { changeLoadingState, setLoginState })(PasswordUpdate);
