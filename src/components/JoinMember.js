import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import "../css/JoinMember.scss";
import { getText, postData } from "../api/api";
import { useNavigate } from "react-router-dom";
import { getFormatDate } from "../modules/common";
import BirthdayItem from "../components/common/Birthday";
import { changeLoadingState } from "../modules/loading";

const JoinMember = ({ changeLoadingState }) => {
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
  }, [year, month, day, id, nickname, password, passwordAgain]);

  const changeYear = (e) => setYear(e.target.value);

  const changeMonth = (e) => setMonth(e.target.value);

  const changeDay = (e) => setDay(e.target.value);

  const changeId = (e) => {
    setId(e.target.value);
    if (idCheck) setIdCheck(false);
  };

  const changeNickname = (e) => setNickname(e.target.value);

  const changePassword = (e) => setPassword(e.target.value);

  const changePasswordAgain = (e) => setPasswordAgain(e.target.value);

  const onCheckId = (e) => {
    e.preventDefault();

    if (id === "") {
      alert("IDを入力してください。");
      return;
    }

    changeLoadingState(true);

    getText(`/member/isUsedId?id=${id}`).then((result) => {
      changeLoadingState(false);

      if (result === "true") {
        alert("このIDは利用可能です");
        setIdCheck(true);
      } else {
        alert("既に使用されているIDです");
        setId("");
        idInput.current.focus();
      }
    });
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
    changeLoadingState(true);

    postData("/member/join", {
      id: id,
      password: password,
      nickname: nickname,
      birthday: getFormatDate(year, month, day),
    }).then((res) => {
      changeLoadingState(false);
      alert("登録しました。");
      navigate("/login");
    });
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
            <input className="idInput" ref={idInput} value={id} onChange={changeId} />
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
        <button className={`joinBtn ${!activate && "noActivate"}`} type="submit">
          登録する
        </button>
      </form>
    </div>
  );
};

export default connect(({}) => ({}), { changeLoadingState })(JoinMember);
