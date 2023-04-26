import { useRef, useState } from "react";
import "../css/JoinMember.scss";
import { postData } from "../api/api";
import { useNavigate } from "react-router-dom";
import { loginTableTest } from "../api/test";
import { createCalendarOption, getFormatDate } from "../modules/common";

const JoinMember = () => {
  const nowYear = new Date().getFullYear();

  const [year, setYear] = useState(-1);
  const [month, setMonth] = useState(-1);
  const [day, setDay] = useState(-1);

  const [check, setCheck] = useState(false);

  const [checkId, setCheckId] = useState(true);
  const [checkNickname, setCheckNickname] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkPwCheck, setCheckPwCheck] = useState(true);
  const [checkBirthday, setCheckBirthday] = useState(true);

  const navigate = useNavigate();

  const idInput = useRef(null);
  const pwInput = useRef(null);
  const pwCheckInput = useRef(null);
  const nicknameInput = useRef(null);

  const defaultOption = [
    <option key="-1" value="-1">
      選択
    </option>,
  ];

  const getLastDay = () => {
    return new Date(year, month, 0).getDate();
  };

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };

  const changeDay = (e) => {
    setDay(e.target.value);
  };

  const onChangeId = (e) => {
    setCheck(false);
  };

  const onCheckId = (e) => {
    e.preventDefault();
    const id = idInput.current.value;

    if (id === "") {
      alert("IDを入力してください。");
      return;
    }

    if (loginTableTest.checkId(id)) {
      alert("既に使用されているIDです");
      idInput.current.value = "";
      idInput.current.focus();
      return;
    }

    alert("このIDは利用可能です");
    setCheck(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let text = "";

    if (nicknameInput.current.value === "") {
      text += "「ニックネーム」を入力してください。\n";
      setCheckNickname(false);
    }

    if (!check) {
      text += "「検査」ボタンをクリックしてください。\n";
      setCheckId(false);
    }

    if (pwInput.current.value === "") {
      text += "「パスワード」を入力してください。\n";
      setCheckPassword(false);
    }

    if (pwCheckInput.current.value === "") {
      text += "「パスワード確認」を入力してください。\n";
      setCheckPwCheck(false);
    }

    if (pwInput.current.value !== pwCheckInput.current.value) {
      text += "パスワードが一致しません。\n";

      pwInput.current.value = "";
      pwCheckInput.current.value = "";

      setCheckPassword(false);
      setCheckPwCheck(false);
    }

    if (year === -1 || month === -1 || day === -1) {
      text += "「生年月日」を選択してください。\n";
      setCheckBirthday(false);
    }

    if (text !== "") {
      alert(text);
      return;
    }

    // postData("/member/post", {
    //   id: "test3",
    //   password: "test3",
    //   nickname: "test3",
    //   birthday: "2015-07-20",
    // }).then((res) => console.log(res));

    loginTableTest.addData(
      idInput.current.value,
      pwInput.current.value,
      nicknameInput.current.value,
      getFormatDate(year, month, day)
    );

    console.log("登録完了");
    navigate("/login");
  };

  return (
    <div className="joinMemberPage">
      <div className="title">新規会員登録</div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className={`key ${checkNickname ? "" : "noPass"}`}>
            ニックネーム
          </div>
          <input ref={nicknameInput} />
        </div>
        <div className="inputBox">
          <div className={`key ${checkId ? "" : "noPass"}`}>ID</div>
          <div className="idBox">
            <input className="idInput" ref={idInput} onChange={onChangeId} />
            <button className="checkId" onClick={onCheckId}>
              検索
            </button>
          </div>
        </div>
        <div className="inputBox">
          <div className={`key ${checkPassword ? "" : "noPass"}`}>
            パスワード
          </div>
          <input ref={pwInput} />
        </div>
        <div className="inputBox">
          <div className={`key ${checkPwCheck ? "" : "noPass"}`}>
            パスワード確認
          </div>
          <input ref={pwCheckInput} />
        </div>
        <div className="inputBox">
          <div className={`key ${checkBirthday ? "" : "noPass"}`}>生年月日</div>
          <div className="selectBox">
            <select onChange={changeYear} value={year}>
              {createCalendarOption(1900, nowYear, "desc")}
            </select>
            <p>年</p>
            <select onChange={changeMonth} value={month}>
              {year !== -1 ? createCalendarOption(1, 12) : defaultOption}
            </select>
            <p>月</p>
            <select onChange={changeDay} value={day}>
              {month !== -1
                ? createCalendarOption(1, getLastDay())
                : defaultOption}
            </select>
            <p>日</p>
          </div>
        </div>
        <button className="joinBtn" type="submit">
          登録する
        </button>
      </form>
    </div>
  );
};

export default JoinMember;
