export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // приватный метод отправляющий запрос для обработки ошибок
    _sentResponse(res) {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    // Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
         method: 'GET',
         headers: this._headers
        })
            .then(this._sentResponse)
    }
    // Редактирование профиля
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(this._sentResponse)
    }
    // Загрузка карточек с сервера
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._sentResponse)
    }
    // объединение двух запросов в один промис для одновременной обработки
  /*  getData() {
        return Promise.all([this.updateUserInfo(), this.getCards()]);
    }*/
    // Добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then(this._sentResponse)
    }
        // Постановка лайка
    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._sentResponse)
    }
        // Снятие лайка
    dislikeCard(id){
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._sentResponse)
    }
    // Удаление карточки
    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._sentResponse)
    }
    // Обновление аватара пользователя
    updateAvatar(data){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._sentResponse)
    }
}



/// заметки на полях:
// Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.
// Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.
// Метод Promise.all принимает массив промисов и возвращает новый промис.

//Каждый метод, включающий обращение к серверу содержит return fetch, т.е возвращает объект Promise

// В name должно быть название создаваемой карточки, а в link — ссылка на картинку.
// У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку
