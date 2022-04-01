import {polymorph} from "./utils";

export const request = polymorph(
  function (type, id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-8/${id}`, {
      method: type,
      headers: {
        authorization: 'c88eea69-7eb3-42c3-9092-d5939e2a4a28',
      }
    })
  },
  function (type, id, body) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-8/${id}`, {
      method: type,
      headers: {
        authorization: 'c88eea69-7eb3-42c3-9092-d5939e2a4a28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
);
