import axios from "axios";

export const request = async (url) => {
  return await axios.get(url);
};

export const getData = (url) => {
  const result = new Promise((resolve, reject) => {
    request(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => reject(e));
  });

  return result;
};
