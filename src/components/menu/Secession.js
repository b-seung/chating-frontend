import PreButton from "../common/PreButton";
import { useNavigate } from "react-router-dom";
import "../../css/Form.scss";

const Secession = () => {
  const navigate = useNavigate();

  const onPreClick = () => {
    navigate(-1);
  };

  const onClick = () => {
    const password = prompt("退会をするために現在のパスワードを入力してください。", "");

    alert("退会しました。ありがとうございました。");

    navigate("/login");
  };

  return (
    <div className="secessionPage">
      <PreButton />
      <div className="title">会員退会</div>
      <div className="subtitle">
        <p>以下の会員登録を退会します。</p>
        <p>よろしければ「退会を実行する」を</p>
        <p>クリックしてください。</p>
      </div>
      <div className="form">
        <div className="box">
          <div className="key">ログインID</div>
          <div className="value">id</div>
        </div>
        <div className="box">
          <div className="key">ニックネーム</div>
          <div className="value">id</div>
        </div>
        <div className="box">
          <div className="key">生年月日</div>
          <div className="value">id</div>
        </div>
        <div className="btnBox">
          <button className="preBtn" onClick={onPreClick}>
            戻る
          </button>
          <button className="secessionBtn" onClick={onClick}>
            <p>退会を実行する</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Secession;
