import { useState, useEffect } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loginTableTest } from "../../api/test";
import { getFormatDate } from "../../modules/common";
import BirthdayItem from "../common/Birthday";

const LostCheck = ({ setOk }) => {
  const navigate = useNavigate();

  const [year, setYear] = useState("-1");
  const [month, setMonth] = useState("-1");
  const [day, setDay] = useState("-1");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    if (year !== "-1" && month !== "-1" && day !== "-1" && id !== "" && nickname !== "") setActivate(true);
    else setActivate(false);
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!activate) return;

    const user = loginTableTest.findUser(nickname, id, getFormatDate(year, month, day));

    if (user) {
      setOk(true);
      navigate(`./reset?id=${id}`);
    } else {
      alert("一致するアカウントがありません");
    }
  };

  return (
    <div className="lostCheck">
      <div className="subtitle">
        <p>ご登録時のログインIDとニックネーム、</p>
        <p>生年月日を入力してください。</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <div className={`key`}>ログインID</div>
          <input onChange={onIdChange} />
        </div>
        <div className="inputBox">
          <div className={`key`}>ニックネーム</div>
          <input onChange={onNicknameChange} />
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
            <p>次に</p>
            <MdOutlineArrowCircleRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostCheck;
