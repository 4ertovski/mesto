export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._profileName = name;
    this._profileJob = about;
    this._userAvatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}
