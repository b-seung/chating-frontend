import axios from "axios";

const getRequest = async (url) => {
  return await fetch(url).then((res) => res);
};

const postRequest = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((res) => res);
};

// export const request = async (url) => {
//   return await axios.get(url);
// };

export const getText = (url) => {
  const result = new Promise((resolve, reject) => {
    getRequest(url)
      .then((response) => {
        resolve(response.text());
        // resolve(response.data);
      })
      .catch((e) => reject(e));
  });
  console.log(result);
  return result;
};

export const getJson = (url) => {
  const result = new Promise((resolve, reject) => {
    getRequest(url)
      .then((response) => {
        resolve(response.json());
        // resolve(response.data);
      })
      .catch((e) => reject(e));
  });

  return result;
};

export const postData = (url, data) => {
  console.log(data);
  const result = new Promise((resolve, reject) => {
    postRequest(url, data)
      .then((response) => {
        resolve(response.json());
      })
      .catch((e) => reject(e));
  });
  return result;
};

export const postText = (url, data) => {
  console.log(data);
  const result = new Promise((resolve, reject) => {
    postRequest(url, data)
      .then((response) => {
        resolve(response.text());
      })
      .catch((e) => reject(e));
  });
  return result;
};
