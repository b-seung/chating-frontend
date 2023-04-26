import { TiMail, TiKeyOutline } from "react-icons/ti";
import { MdVisibility } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changeInputId, changeInputPw, changeId } from "../modules/login";
import { getData } from "../api/api";
import "../css/Login.scss";
import { loginTableTest } from "../api/test";

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

  const [loginError, setLoginError] = useState(false);

  const idInput = useRef(null);
  const pwInput = useRef(null);

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

    for (let i = 0; i < loginTableTest.getLength(); i++) {
      if (
        loginTableTest.test_id[i] === inputId &&
        loginTableTest.test_password[i] === inputPw
      ) {
        loginTableTest.setLoginId(inputId);
        changeId(inputId);
        return navigate("/");
      }
    }
    // getData("/member/all").then((members) => {
    //   members.forEach((member) => {
    //     if (member.id === inputId && member.password === inputPw) {
    //       sessionStorage.setItem("loginId", inputId);
    //       changeId(inputId);
    //       return navigate("/");
    //     }
    //   });
    // });

    setLoginError(true);
  };

  const onReset = (e) => {
    e.preventDefault();
    navigate("/lost");
  };

  const onAccount = (e) => {
    e.preventDefault();
    navigate("/join");
  };

  const onChange1 = (e) => {
    changeInputId(e.target.value);
  };
  const onChange2 = (e) => {
    changeInputPw(e.target.value);
  };

  const onVisiblePw = () => {
    if (pwInput.current.type === "text") pwInput.current.type = "password";
    else if (pwInput.current.type === "password") pwInput.current.type = "text";
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
            type="password"
            onChange={onChange2}
            ref={pwInput}
          />
          <MdVisibility className="icon visible" onClick={onVisiblePw} />
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
