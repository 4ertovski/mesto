import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, {submitForm}) {
    super(popupElement);
    this._submitForm = submitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
  }

//метод собирает все поля формы
  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach(item => {
      this._formValue[item.name] = item.value;
    });
    return this._formValue
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loaderHandler('Сохранение...');
      this._submitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  open() {
    super.open();
  }
}