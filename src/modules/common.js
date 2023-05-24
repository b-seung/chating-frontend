import { useNavigate } from "react-router-dom";

export const getFormatDate = (year, month, day, delimiter = "-") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [year, change(month), change(day)].join(delimiter);
};

export const getFormatAllTime = (hour, minute, seconds, delimiter = ":") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [change(hour), change(minute), change(seconds)].join(delimiter);
};

export const getFormatTime = (hour, minute, delimiter = ":") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [change(hour), change(minute)].join(delimiter);
};

export const getDateTime = (year, month, day, hour, minute, second, milliSecond) => {
  return getFormatDate(year, month, day) + " " + getFormatAllTime(hour, minute, second) + "." + milliSecond;
};

export const isError = (navigate, value) => {
  if (value) {
    alert("エラーが発生しました。\nログイン画面に戻ります。");
    navigate("/login");
  }
};
