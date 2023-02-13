import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }
  // приватный метод, который собирает данные со всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // перезаписывает родительский метод, не только добавляя обработчик по клику на иконку закрытия,
  // но и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    //super.setEventListeners();
  }

  // перезаписывает родительский метод, чтобы сбрасывать форму при закрытии попапа
  close() {
    super.close();
    this._popupForm.reset();
    //super.close();
  }
}
