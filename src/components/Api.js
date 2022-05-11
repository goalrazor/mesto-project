export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(type, id, body) {
    return fetch(`${this._baseUrl}/${id}`, {
      method: type,
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfileInfoFromServer() {
    return this._request('GET', 'users/me');
  }

  getCards() {
    return this._request('GET', 'cards')
  }

  updateUserInfo(body) {
    return this._request('PATCH', 'users/me', body);
  }

  updateUserAvatar(body) {
    return this._request('PATCH', 'users/me/avatar', body);
  }

  postNewCard(body) {
    return this._request('POST', 'cards', body);
  }

  deleteLikeOnCard(cardId) {
    return this._request('DELETE', `cards/likes/${cardId}`)
  }

  addLikeOnCard(cardId) {
    return this._request('PUT', `cards/likes/${cardId}`)
  }

  deleteCard(cardId) {
    return this._request('DELETE', `cards/${cardId}`)
  }
}
