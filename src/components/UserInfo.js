export default class UserInfo {
  // Класс принимает в конструктор объект с селекторами двух элементов: имени пользователя и информации о себе.
  constructor(data) {
    this._profileName = data.name;
    this._profileDefinition = data.definition;
  }
  // публичный метод, который возвращает объект с данными пользователя. подставляет данные пользователя при открытии.
  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      definition: this._profileDefinition.textContent,
    };
    return this._userInfo;
  }
  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newUserData) {
    this._profileName.textContent = newUserData.name;
    this._profileDefinition.textContent = newUserData.definition;
  }
}
