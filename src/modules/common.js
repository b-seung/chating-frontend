export const getFormatDate = (year, month, day, delimiter = "-") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [year, change(month), change(day)].join(delimiter);
};

export const getFormatTime = (hour, minute, delimiter = ":") => {
  const change = (value) => {
    if (value >= 10) return value;
    return `0${value}`;
  };

  return [change(hour), change(minute)].join(delimiter);
};
