class Api {
    constructor({ baseUrl, headers }) {  
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {        
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => this._handleResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards `, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => this._handleResponse(res));
    }

    patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then((res) => this._handleResponse(res));
    }

    postNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card),
        })
        .then((res) => this._handleResponse(res));
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => this._handleResponse(res));
    }

    putLikeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => this._handleResponse(res));
    }

    deleteLikeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => this._handleResponse(res));
    }

    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: avatar}),
        })
        .then((res) => this._handleResponse(res));
    }
}

// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
//     headers: {
//       authorization: '38cb0870-aa41-456b-9f9f-084af1a40bb1',
//       'Content-Type': 'application/json',
//     },
// });

const api = new Api({
    baseUrl: 'http://api.elman3605.students.nomoredomains.xyz',
    headers: {
    //   authorization: '38cb0870-aa41-456b-9f9f-084af1a40bb1',
      'Content-Type': 'application/json',
    },
});

export default api;