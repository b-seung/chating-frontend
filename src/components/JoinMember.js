import { useState } from "react";

const createOption = (start, end, order = "asc") => {
  const array = [
    <option key="-1" value="-1">
      選択
    </option>,
  ];

  if (order === "desc") {
    for (let num = end; num >= start; num--) {
      array.push(
        <option key={num} value={num}>
          {num}
        </option>
      );
    }
  } else {
    for (let num = start; num <= end; num++) {
      array.push(
        <option key={num} value={num}>
          {num}
        </option>
      );
    }
  }

  return array;
};

const JoinMember = () => {
  const nowYear = new Date().getFullYear();

  const [year, setYear] = useState(-1);
  const [month, setMonth] = useState(-1);
  const [day, setDay] = useState(-1);

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
  //

  return (
    <div className="joinMemberPage">
      <div className="title">新規会員登録</div>
      <form>
        <div className="inputBox">
          <div>ニックネーム</div>
          <input />
        </div>
        <div className="inputBox">
          <div>ID</div>
          <input className="idInput" />
          <button className="checkId">検索</button>
        </div>
        <div className="inputBox">
          <div>パスワード</div>
          <input />
        </div>
        <div className="inputBox">
          <div>パスワード確認</div>
          <input />
        </div>
        <div className="inputBox">
          <div>生年月日</div>
          <select onChange={changeYear} value={year}>
            {createOption(1900, nowYear, "desc")}
          </select>
          <p>年</p>
          <select onChange={changeMonth} value={month}>
            {year !== -1 ? createOption(1, 12) : defaultOption}
          </select>
          <p>月</p>
          <select onChange={changeDay} value={day}>
            {month !== -1 ? createOption(1, getLastDay()) : defaultOption}
          </select>
          <p>日</p>
        </div>
        <button className="joinBtn">登録する</button>
      </form>
    </div>
  );
};

export default JoinMember;
