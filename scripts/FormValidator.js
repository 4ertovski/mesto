export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._errorSelector = config.errorSelector;
    this._submitBtnSelector = config.submitBtnSelector;
    this._inactiveBtnClass = config.inactiveBtnClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._btnElement = this._formElement.querySelector(this._submitBtnSelector);
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // приватный метод показывает сообщение об ошибке
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //приватный метод скрывает сообщение об ошибке
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  activateButton() {
    this._btnElement.classList.add(this._inactiveBtnClass);
    this._btnElement.disabled = true;
  }
  _deactivateButton() {
    this._btnElement.classList.remove(this._inactiveBtnClass);
    this._btnElement.disabled = false;
  }

  //приватный метод, который переключает активность кнопок
  _toggleBtnState = () => {
    if (this._hasInvalidInput()) {
      this.activateButton();
      //this._btnElement.classList.add(this._inactiveBtnClass);
      //this._btnElement.disabled = true;
    } else {
      this._deactivateButton();
      //this._btnElement.classList.remove(this._inactiveBtnClass);
      //this._btnElement.disabled = false;
    }
  };

  //приватный метод проверки валидности поля
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage); //Передаем сообщение об ошибке
    } else {
      this._hideInputError(inputElement);
    }
  };

  //приватный слушатель, который добавляет сообщения об ошибках
  _setEventListeners = () => {
    this._toggleBtnState();

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleBtnState();
      }, 0);
    });

    // потом уже `forEach`

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleBtnState();
        //this._formElement.addEventListener("reset", () => {
        //setTimeout(() => {
        //this._toggleBtnState();
        //}, 0);
        //});
      });
    });
  };

  //публичный метод, который будет сбрасывать ошибки с текущей формы
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //публичный метод который включает валидацию
  enableValidation = () => {
    this._setEventListeners();
  };
}
