import { TiMail, TiKeyOutline } from "react-icons/ti";
import { MdVisibility } from "react-icons/md";
import { useState, useRef } from "react";

const Login = ({ menu }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const idInput = useRef(null);
  const pwInput = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value1 === "") {
      alert("ログインIDを入力してください。");
      idInput.current.focus();
      return;
    }
    if (value1 === "") {
      alert("パスワードを入力してください。");
      pwInput.current.focus();
      return;
    }
  };

  const onChange1 = (e) => {
    setValue1(e.target.value);
  };
  const onChange2 = (e) => {
    setValue2(e.target.value);
  };

  return (
    <div>
      <div className="title">ログイン</div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <input
            placeholder="ログインID"
            value={value1}
            onChange={onChange1}
            ref={idInput}
          />
          <TiMail />
        </div>
        <div className="inputBox">
          <input
            placeholder="パスワード"
            value={value2}
            onChange={onChange2}
            ref={pwInput}
          />
          <TiKeyOutline />
          <MdVisibility />
        </div>
        <button type="submit">ログインする</button>
      </form>
      <button>パスワードをお忘れですか？</button>
      <button>新しいアカウントを作成する</button>
      <div>{menu ? "true" : "false"}</div>
    </div>
  );
};

export default Login;
