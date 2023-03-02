import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement){
    super(popupElement);
    this._title = this._popup.querySelector('.popup__item');
    this._image = this._popup.querySelector('.popup__item-subject');
  }

  open(name, link){
    super.open();
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = link;
  }
}
