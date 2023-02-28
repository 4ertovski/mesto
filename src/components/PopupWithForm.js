import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    console.log(this._popupForm);
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    console.log(this._inputList);
    this._submitButton = this._popup.querySelector(".popup__button_active_submit");
    this._handleFormSubmit = handleFormSubmit;
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
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
