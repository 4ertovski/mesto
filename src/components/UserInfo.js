export default class UserInfo {
  // Класс принимает в конструктор объект с селекторами двух элементов: имени пользователя и информации о себе.
  constructor({selectorName, selectorAbout, selectorAvatar}) {
    this._profileName = document.querySelector(selectorName);
    this._profileDefinition = document.querySelector(selectorAbout);
    this._userAvatar = document.querySelector(selectorAvatar);
  }
  // публичный метод, который возвращает объект с данными пользователя. подставляет данные пользователя при открытии.
  getUserInfo() {
    this._userInfo = {
      selectorName: this._profileName.textContent,
      selectorAbout: this._profileDefinition.textContent,
      selectorAvatar: this._userAvatar.src,
    };
    return this._userInfo;
  }
  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDefinition.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}

