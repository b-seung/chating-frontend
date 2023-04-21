import { TiMail, TiKeyOutline } from "react-icons/ti";
import { MdVisibility } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changeInputId, changeInputPw, changeId } from "../modules/login";
import { getData } from "../api/api";
import "../css/Login.scss";

const Login = ({
  menu,
  loginId,
  inputId,
  inputPw,
  changeInputId,
  changeInputPw,
  changeId,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loginId !== null) {
      if (!alert("既にログインされています。")) {
        navigate("/");
      }
    }
  }, [navigate]);

  const [members, setMembers] = useState(new Array());
  const [loginError, setLoginError] = useState(false);

  const idInput = useRef(null);
  const pwInput = useRef(null);

  getData("/member/all").then((result) => setMembers(result));

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputId === "") {
      alert("ログインIDを入力してください。");
      idInput.current.focus();
      return;
    }

    if (inputPw === "") {
      alert("パスワードを入力してください。");
      pwInput.current.focus();
      return;
    }

    members.forEach((member) => {
      if (member.id === inputId && member.password === inputPw) {
        sessionStorage.setItem("loginId", inputId);
        changeId(inputId);
        return navigate("/");
      }
    });

    setLoginError(true);
  };

  const onReset = (e) => {
    e.preventDefault();
    console.log("reset");
  };

  const onAccount = (e) => {
    e.preventDefault();
    console.log("account");
  };

  const onChange1 = (e) => {
    changeInputId(e.target.value);
  };
  const onChange2 = (e) => {
    changeInputPw(e.target.value);
  };

  return (
    <div className="loginPage">
      <div className="titleBox">
        <div className="title">ログイン</div>
        {loginError ? (
          <div className="message">
            ログインID、もしくはパスワードが異なります。
          </div>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <TiMail className="icon" />
          <input
            placeholder="ログインID"
            value={inputId}
            onChange={onChange1}
            ref={idInput}
          />
        </div>
        <div className="inputBox">
          <TiKeyOutline className="icon" />
          <input
            placeholder="パスワード"
            value={inputPw}
            onChange={onChange2}
            ref={pwInput}
          />
          <MdVisibility className="icon" />
        </div>
        <button className="button loginBtn" type="submit">
          ログインする
        </button>
        <div>
          <button className="resetBtn" onClick={onReset}>
            パスワードをお忘れですか？
          </button>
        </div>

        <button className="button accountBtn" onClick={onAccount}>
          新しいアカウントを作成する
        </button>
      </form>

      <div>{menu ? "true" : "false"}</div>
    </div>
  );
};

export default connect(
  ({ login }) => ({
    inputId: login.inputId,
    inputPw: login.inputPw,
    loginId: login.id,
  }),
  { changeInputId, changeInputPw, changeId }
)(Login);
