const createCalendarOption = (start, end, order = "asc") => {
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

const BirthdayItem = ({
  year,
  month,
  day,
  changeYear,
  changeMonth,
  changeDay,
}) => {
  const nowYear = new Date().getFullYear();

  const defaultOption = [
    <option key="-1" value="-1">
      選択
    </option>,
  ];

  const getLastDay = () => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <>
      <div className="key">生年月日</div>
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
          {month !== -1 ? createCalendarOption(1, getLastDay()) : defaultOption}
        </select>
        <p>日</p>
      </div>
    </>
  );
};

export default BirthdayItem;
