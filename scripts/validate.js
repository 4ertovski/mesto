const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorSelector: '.popup__input-error',
  submitBtnSelector: '.popup__button_active_submit',
  inactiveBtnClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input-error_active',
}

/** Получение формы */
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setHandlers(form, config);
  })
};

/** Обработчик формы */
function setHandlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitBtnSelector);
  toggleBtnState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);
      toggleBtnState(inputs, button, config);
    })
  })
};

/** Валидация инпутов */
function validateInput(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
  }
  else {
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  }
};

/** Изменение статуса кнопки формы */
function toggleBtnState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    addDisabledBtn(button, config);
  }
  else {
    removeDisabledBtn(button, config);
  }
};

/** Проверка формы на валидность*/
function hasInvalidInput(inputs) {
  return (inputs.some((input) => !input.validity.valid));
};

/** Активация-деактивация кнопки формы */
function removeDisabledBtn(button, config) {
  button.classList.remove(config.inactiveBtnClass);
  button.removeAttribute('disabled', false);
};

function addDisabledBtn(button, config) {
  button.classList.add(config.inactiveBtnClass);
  button.setAttribute('disabled', true);
};

enableValidation(validationConfig);
