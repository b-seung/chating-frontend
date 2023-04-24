import axios from "axios";

const getRequest = async (url) => {
  return await fetch(url).then((res) => {
    return res.json();
  });
};

const postRequest = async (url, data) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => {
      console.log(res);
    });
};

// export const request = async (url) => {
//   return await axios.get(url);
// };

export const getData = (url) => {
  const result = new Promise((resolve, reject) => {
    getRequest(url)
      .then((response) => {
        console.log(response);
        resolve(response);
        // resolve(response.data);
      })
      .catch((e) => reject(e));
  });
  return result;
};

export const postData = (url, data) => {
  const result = new Promise((resolve, reject) => {
    postRequest(url, data)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => reject(e));
  });
  return result;
};
