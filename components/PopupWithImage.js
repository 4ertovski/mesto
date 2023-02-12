import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector(".popup__item");
    this._name = this._popupSelector.querySelector(".popup__item-subject");
  }
  //перезаписывает родительский метод open и получает картинку с подписью

  open(data) {
    super.open();
    this._image.src = data.src;
    this._image.alt = data.alt;
    this._name.textContent = data.alt;
  }
}
