import {polymorph} from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: 'c88eea69-7eb3-42c3-9092-d5939e2a4a28',
    'Content-Type': 'application/json'
  }
}

const request = polymorph(
  function (type, id) {
    return fetch(`${config.baseUrl}/${id}`, {
      method: type,
      headers: config.headers
    })
      .then(checkResponse);
  },
  function (type, id, body) {
    return fetch(`${config.baseUrl}/${id}`, {
      method: type,
      headers: config.headers,
      body: JSON.stringify(body)
    })
      .then(checkResponse);
  }
)

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getProfileInfoFromServer() {
  return request('GET', 'users/me')
}

export function getCards() {
  return request('GET', 'cards')
}

export function updateUserInfo(body) {
  return request('PATCH', 'users/me', body);
}

export function updateUserAvatar(body) {
  return request('PATCH', 'users/me/avatar', body);
}

export function postNewCard(body) {
  return request('POST', 'cards', body);
}

export function deleteLikeOnCard(cardId) {
  return request('DELETE', `cards/likes/${cardId}`)
}

export function addLikeOnCard(cardId) {
  return request('PUT', `cards/likes/${cardId}`)
}

export function deleteCard(cardId) {
  return request('DELETE', `cards/${cardId}`)
}
