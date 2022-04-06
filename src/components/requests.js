import {polymorph} from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: 'c88eea69-7eb3-42c3-9092-d5939e2a4a28',
    'Content-Type': 'application/json'
  }
}

export const request = polymorph(
  function (type, id) {
    return fetch(`${config.baseUrl}/${id}`, {
      method: type,
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  },
  function (type, id, body) {
    return fetch(`${config.baseUrl}/${id}`, {
      method: type,
      headers: config.headers,
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }
);

export function getProfileInfoFromServer() {
  return request('GET', 'users/me')
}

export function getCards() {
  return request('GET', 'cards')
}

