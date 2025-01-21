class Api {
  constructor({ baseURL, userAuthorization }) {
    this._baseURL = baseURL;
    this._userAuthorization = userAuthorization;
  }

  _makeRequest(path, method = 'GET', body = null) {
    const options = {
      method,
      headers: { ...this.headers, authorization: this._userAuthorization },
    };

    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseURL}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards(path) {
    return this._makeRequest(path);
  }

  addNewCard({ title: cardName, link: cardLink }, path) {
    return this._makeRequest(path, 'POST', {
      name: `${cardName}`,
      link: `${cardLink}`,
    });
  }

  deleteCard(cardId, path) {
    return this._makeRequest(`${path}/${cardId}`, 'DELETE');
  }

  getUserInfo(path) {
    return this._makeRequest(path);
  }

  updateUserInfo({ name: userName, about: userAbout }, path) {
    return this._makeRequest(path, 'PATCH', {
      name: `${userName}`,
      about: `${userAbout}`,
    });
  }

  updateUserAvatar(picture, path) {
    return this._makeRequest(path, 'PATCH', { avatar: `${picture}` });
  }

  like(cardId, path) {
    return this._makeRequest(`${path}/${cardId}`, 'PUT');
  }

  dislike(cardId, path) {
    return this._makeRequest(`${path}/${cardId}`, 'DELETE');
  }
}

export default new Api({
  baseURL: 'https://around.nomoreparties.co/v1/web-ptbr-cohort-11',
  userAuthorization: '3fda8d28-174d-4647-9b4c-9acb9effd1bc',
});
