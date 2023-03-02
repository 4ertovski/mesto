export default class FormValidator {
  constructor (validationConfig, form) {
    this._form = form;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass
  }
  //показ ошибок в спане
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  //удаление ошибок из спана
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid ?
        this._showInputError(inputElement, inputElement.validationMessage) :
        this._hideInputError(inputElement);
  };
  //проверка валидности по каждому элементу
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  //смена состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));  // Найдём все поля формы и сделаем из них массив
    const buttonElement = this._form.querySelector(this._submitButtonSelector); // Найдём в текущей форме кнопку отправки
    this._toggleButtonState(inputList, buttonElement);  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  // дописал метод очистки ошибок
  resetValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // определяем инпуты
    const buttonElement = this._form.querySelector(this._submitButtonSelector); // определяем кнопку
    // для каждого инпута проводим проверку наличия класса ошибки
    inputList.forEach(inputElement => {
      //если находим ошибку то убираем ее
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(inputElement);
      }
    });
    this._toggleButtonState(inputList, buttonElement);
  };


  enableValidation(){
    this._setEventListeners();}

}
