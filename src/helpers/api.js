export const get = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())

      .then(json => resolve(json));
  });

const apiCall = (url, method, body, resolve, reject) =>
  fetch(url, {
    method: method,
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },

    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) {
      response.text().then(text => resolve(text));
    } else if (response.status === 400) {
      response.json().then(json => resolve(json));
    } else if (response.status === 404) {
      response.json().then(json => resolve(json));
    } else if (response.status === 500) {
      response.json().then(json => resolve(json));
    } else {
      reject(response);
    }
  });

export const post = (url, body) =>
  new Promise((resolve, reject) => apiCall(url, "POST", body, resolve, reject));
