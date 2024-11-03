class Api {
  constructor({ baseURL, userAuthorization }) {
    this._baseURL = baseURL;
    this._userAuthorization = userAuthorization;
  }

  getInitialCards(path) {
    return fetch(`${this._baseURL}${path}`, {
      method: 'GET',
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  addNewCard({ title: cardName, link: cardLink }, path) {
    return fetch(`${this._baseURL}${path}`, {
      method: 'POST',
      headers: {
        authorization: this._userAuthorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${cardName}`,
        link: `${cardLink}`,
      }),
    });
  }

  deleteCard(cardId, path) {
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  getUserInfo(path) {
    return fetch(`${this._baseURL}${path}`, {
      method: 'GET',
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  updateUserInfo({ name: userName, about: userAbout }, path) {
    return fetch(`${this._baseURL}${path}`, {
      method: 'PATCH',
      headers: {
        authorization: this._userAuthorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userName}`,
        about: `${userAbout}`,
      }),
    });
  }

  updateUserAvatar({ picture }, path) {
    return fetch(`${this._baseURL}${path}`, {
      method: 'PATCH',
      headers: {
        authorization: this._userAuthorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: `${picture}` }),
    });
  }

  like(cardId, path) {
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  dislike(cardId, path) {
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }
}

export default new Api({
  baseURL: 'https://around.nomoreparties.co/v1/web-ptbr-cohort-11',
  userAuthorization: '3fda8d28-174d-4647-9b4c-9acb9effd1bc',
});
