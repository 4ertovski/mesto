export default class UserInfo {
  // Класс принимает в конструктор объект с селекторами двух элементов: имени пользователя и информации о себе.
  constructor(data) {
    this._profileName = data.name;
    this._profileDefinition = data.about;
    this._userAvatar = data.avatar;
  }
  // публичный метод, который возвращает объект с данными пользователя. подставляет данные пользователя при открытии.
  getUserInfo() {
    this._userInfo = {
      name: this._profileName,
      about: this._profileDefinition,
      avatar: this._userAvatar,
    };
    return this._userInfo;
  }
  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newUserData) {
    this._profileName.textContent = newUserData.name;
    this._profileDefinition.textContent = newUserData.about;
    //this._userAvatar.src = newUserData.avatar;
  }
  setUserAvatar(link) {
    this._userAvatar.src = link;
  }
  setId(id) {
    this._id = id;
  }
  getId() {
    return this._id;
  }

}

