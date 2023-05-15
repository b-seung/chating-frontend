import PreButton from "../common/PreButton";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { changeLoadingState } from "../../modules/loading";
import { getFormatDate } from "../../modules/common";
import { getJson, getText, postText } from "../../api/api";
import "../../css/Form.scss";

import BirthdayItem from "../common/Birthday";

const UserUpdate = ({ changeLoadingState }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nowId, setNowId] = useState("");
  const [nickname, setNickname] = useState("");

  const [year, setYear] = useState("-1");
  const [month, setMonth] = useState("-1");
  const [day, setDay] = useState("-1");

  const [activate, setActivate] = useState(false);
  const [idCheck, setIdCheck] = useState(false);

  useEffect(() => {
    changeLoadingState(true);
    getJson("/member/check").then((result) => {
      changeLoadingState(false);
      
      if (result["error"]) {
        alert("エラーが発生しました。\nログイン画面に戻ります。");
        navigate("/login");
      }

      changeLoadingState(false);
      setId(result["id"]);
      setNowId(result["id"]);
      setNickname(result["nickname"]);

      const birthday = new Date(result["birthday"]);
      setYear(birthday.getFullYear());
      setMonth(birthday.getMonth() + 1);
      setDay(birthday.getDate());
    });
  }, []);

  useEffect(() => {
    if (year !== "-1" && month !== "-1" && day !== "-1" && id !== "" && nickname !== "") {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [year, month, day, id, nickname]);

  const changeYear = (e) => setYear(e.target.value);

  const changeMonth = (e) => setMonth(e.target.value);

  const changeDay = (e) => setDay(e.target.value);

  const onIdChange = (e) => setId(e.target.value);

  const onNicknameChange = (e) => setNickname(e.target.value);

  const onPreClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onCheckId = (e) => {
    e.preventDefault();

    if (id === "") {
      alert("IDを入力してください。");
      return;
    }

    if (id === nowId) {
      alert("このIDは利用可能です");
      setIdCheck(true);
      return;
    }

    changeLoadingState(true);

    getText(`/member/idTest?id=${id}`).then((result) => {
      changeLoadingState(false);

      if (result === "true") {
        alert("このIDは利用可能です");
        setIdCheck(true);
      } else {
        alert("既に使用されているIDです");
        setId("");
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

    postText("/member/update", {
      originId: nowId,
      id: id,
      nickname: nickname,
      birthday: getFormatDate(year, month, day),
    }).then((res) => {
      changeLoadingState(false);
      alert("変更しました。");
      navigate("/");
    });
  };

  return (
    <div className="updatePage">
      <PreButton />
      <div className="title">登録情報修正</div>
      <div className="subtitle">
        <p>以下の情報を入力し、</p>
        <p>「変更」ボタンをクリックしてください。</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className="key">ログインID</div>
          <input onChange={onIdChange} value={id} />
          <button className="checkId" onClick={onCheckId}>
            検索
          </button>
        </div>
        <div className="inputBox">
          <div className="key">ニックネーム</div>
          <input onChange={onNicknameChange} value={nickname} />
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
        <div className="btnBox">
          <button className="preBtn" onClick={onPreClick}>
            戻る
          </button>
          <button className={`nextBtn ${!activate && "noActivate"}`}>
            <p>変更</p>
            <MdOutlineArrowCircleRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(({}) => ({}), { changeLoadingState })(UserUpdate);
