export const getFormatDate = (year, month, day, delimiter = "-") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [year, change(month), change(day)].join(delimiter);
};

export const createCalendarOption = (start, end, order = "asc") => {
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
