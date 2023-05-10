import { TiMail, TiKeyOutline } from "react-icons/ti";
import { MdVisibility } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changeInputId, changeInputPw, setLoginState } from "../modules/login";
import { getText, postData } from "../api/api";
import "../css/Login.scss";

const Login = ({ loginState, inputId, inputPw, changeInputId, changeInputPw, setLoginState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState) {
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

    getText(`/member/login?id=${inputId}&password=${inputPw}`)
      .then((result) => {
        if (result === "true") {
          setLoginState(true);
          changeInputId("");
          changeInputPw("");
          return navigate("/");
        } else {
          setLoginError(true);
        }
      })
      .catch(() => alert("ログインに失敗しました。\nもう一度試してください。"));

    // postData("/member/login", { id: inputId, password: inputPw }).then((result) => console.log(result));
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
        {loginError && <div className="message">ログインID、もしくはパスワードが異なります。</div>}
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <TiMail className="icon" />
          <input placeholder="ログインID" value={inputId} onChange={onChange1} ref={idInput} />
        </div>
        <div className="inputBox">
          <TiKeyOutline className="icon" />
          <input placeholder="パスワード" value={inputPw} type="password" onChange={onChange2} ref={pwInput} />
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
    </div>
  );
};

export default connect(
  ({ login }) => ({
    loginState: login.loginState,
    inputId: login.inputId,
    inputPw: login.inputPw,
  }),
  { changeInputId, changeInputPw, setLoginState }
)(Login);
