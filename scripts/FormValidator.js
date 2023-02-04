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

  //приватный метод, который переключает активность кнопок
  _toggleBtnState = () => {
    if (this._hasInvalidInput()) {
      this._btnElement.classList.add(this._inactiveBtnClass);
      this._btnElement.disabled = true;
    } else {
      this._btnElement.classList.remove(this._inactiveBtnClass);
      this._btnElement.disabled = false;
    }
  };
  /*
  деактивация кнопки вынесена в disableSubmitBtn, поэтому тут его нужно вызывать, чтобы не дублировать код

      if (this._hasInvalidInput()) {
        this.disableSubmitBtn()
      } else {
 
но потом увидел, что активируется кнопка там. 
Вам нужно определиться, что этот метод делать, и использовать его везде правильно
  */

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
  /*
обработчик reset нужно на 66й строчке 1 раз навесить на форму, а не внутри цикла forEach, 
иначе под каждый инпут это навесится

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleBtnState();
      }, 0); 
    });

// потом уже `forEach`

    this._inputList.forEach((inputElement) => {
 
*/
  //публичный метод, который будет сбрасывать ошибки с текущей формы
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //публичный метод, который при открытии удаляет инактив класс
  //и дает возможность отправки формы
  activateButton() {
    this._btnElement.classList.remove(this._inactiveBtnClass);
    this._btnElement.disabled = false;
  }
  /*
  disableSubmitBtn называете, а внутри активируете кнопку
тогда это должно быть activateButton
  */

  //публичный метод который включает валидацию
  enableValidation = () => {
    this._setEventListeners();
  };
}
