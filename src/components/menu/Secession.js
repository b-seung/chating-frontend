import PreButton from "../common/PreButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { isError } from "../../modules/common";
import { changeLoadingState } from "../../modules/loading";
import { setLoginState } from "../../modules/login";
import { getJson, getText, postData } from "../../api/api";
import "../../css/Form.scss";

const Secession = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");

  const onPreClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    changeLoadingState(true);
    getJson("/member/check").then((result) => {
      changeLoadingState(false);

      isError(navigate, result["error"]);

      setId(result["id"]);
      setNickname(result["nickname"]);
      setBirthday(result["birthday"]);
    });
  }, []);

  const onClick = () => {
    const password = prompt("退会をするために現在のパスワードを入力してください。", "");

    postData("/member/secession", { password: password })
      .then((result) => {
        isError(navigate, result["error"]);
        return result["sucess"];
      })
      .then((result) => {
        if (result) {
          getText("/member/logout").then(() => {
            alert("退会しました。ありがとうございました。");
            navigate("/login");
            setLoginState(false);
          });
        } else {
          alert("パスワードが間違っています。\n確認してもう一度やり直してください。");
        }
      });
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
          <div className="value">{id}</div>
        </div>
        <div className="box">
          <div className="key">ニックネーム</div>
          <div className="value">{nickname}</div>
        </div>
        <div className="box">
          <div className="key">生年月日</div>
          <div className="value">{birthday}</div>
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

export default connect(({}) => ({}), { changeLoadingState, setLoginState })(Secession);
