class Auth {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
  }

  _makeRequest(path, method = 'GET', body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseURL}${path}`, options).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  register(path, { userEmail, userPassword }) {
    return this._makeRequest(path, 'POST', {
      password: `${userPassword}`,
      email: `${userEmail}`,
    });
  }

  authorize(path, { userEmail, userPassword }) {
    return this._makeRequest(path, 'POST', {
      password: `${userPassword}`,
      email: `${userEmail}`,
    });
  }
}

export default new Auth({
  baseURL: 'https://se-register-api.en.tripleten-services.com/v1',
});
