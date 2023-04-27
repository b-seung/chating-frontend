import { useRef, useState, useEffect } from "react";
import "../css/JoinMember.scss";
import { postData } from "../api/api";
import { useNavigate } from "react-router-dom";
import { loginTableTest } from "../api/test";
import { getFormatDate } from "../modules/common";
import BirthdayItem from "../components/common/Birthday";

const JoinMember = () => {
  const [year, setYear] = useState("-1");
  const [month, setMonth] = useState("-1");
  const [day, setDay] = useState("-1");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [activate, setActivate] = useState(false);

  const [idCheck, setIdCheck] = useState(false);

  const idInput = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      year !== "-1" &&
      month !== "-1" &&
      day !== "-1" &&
      id !== "" &&
      nickname !== "" &&
      password !== "" &&
      passwordAgain !== ""
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
    console.log(activate);
  }, [year, month, day, id, nickname, password, passwordAgain]);

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };

  const changeDay = (e) => {
    setDay(e.target.value);
  };

  const changeId = (e) => {
    setId(e.target.value);
    if (idCheck) setIdCheck(false);
  };

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
  };

  const onCheckId = (e) => {
    e.preventDefault();

    if (id === "") {
      alert("IDを入力してください。");
      return;
    }

    if (loginTableTest.checkId(id)) {
      alert("既に使用されているIDです");
      setId("");
      idInput.current.focus();
      return;
    }

    alert("このIDは利用可能です");
    setIdCheck(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!activate) return;

    if (!idCheck) {
      alert("「検査」ボタンをクリックしてください。");
      return;
    }

    if (password !== passwordAgain) {
      alert("パスワードが一致しません。");

      setPassword("");
      setPasswordAgain("");

      return;
    }

    // postData("/member/post", {
    //   id: "test3",
    //   password: "test3",
    //   nickname: "test3",
    //   birthday: "2015-07-20",
    // }).then((res) => console.log(res));
    console.log(`${year} ${month} ${day}`);

    loginTableTest.addData(
      id,
      password,
      nickname,
      getFormatDate(year, month, day)
    );

    alert("登録しました。");
    navigate("/login");
  };

  return (
    <div className="joinMemberPage">
      <div className="title">新規会員登録</div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className="key">ニックネーム</div>
          <input value={nickname} onChange={changeNickname} />
        </div>
        <div className="inputBox">
          <div className="key">ID</div>
          <div className="idBox">
            <input
              className="idInput"
              ref={idInput}
              value={id}
              onChange={changeId}
            />
            <button className="checkId" onClick={onCheckId}>
              検索
            </button>
          </div>
        </div>
        <div className="inputBox">
          <div className="key">パスワード</div>
          <input value={password} onChange={changePassword} />
        </div>
        <div className="inputBox">
          <div className="key">パスワード確認</div>
          <input value={passwordAgain} onChange={changePasswordAgain} />
        </div>
        <div className="inputBox">
          <BirthdayItem
            year={year}
            month={month}
            day={day}
            changeYear={changeYear}
            changeMonth={changeMonth}
            changeDay={changeDay}
          />
        </div>
        <button
          className={`joinBtn ${activate ? "" : "noActivate"}`}
          type="submit"
        >
          登録する
        </button>
      </form>
    </div>
  );
};

export default JoinMember;
