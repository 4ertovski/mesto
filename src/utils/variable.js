export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".popup__input-error",
  submitButtonSelector: ".popup__button_active_submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};


// для валидации
export const popupFormProfile = document.querySelector('.popup__form_profile');
export const popupFormCard = document.querySelector('.popup__form_element');
export const popupFormAvatar = document.querySelector('.popup__form_avatar')

//popups section
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_element');
export const popupImage = document.querySelector('.popup_img');
export const popupAvatar = document.querySelector('.popup_avatar')
export const popupDeleteCard = document.querySelector('.popup_delete-card')

// инпуты
export const nameInput = document.querySelector('.popup__input_profile_name');
export const jobInput = document.querySelector('.popup__input_profile_title');

// кнопки
export const editProfileButton = document.querySelector('.profile__button_active_edit');
export const addCardButton = document.querySelector('.profile__button_active_add');
export const avatarEditButton = document.querySelector('.profile__avatar-container')

// профайл
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__definition');
export const userAvatar = document.querySelector('.profile__avatar')



export const userSetting = {
  name: profileName,
  about: profileJob,
  avatar: userAvatar
}

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '3aa61c49-fdf8-469f-ac89-ecfdfa4ec988',
    'Content-Type': 'application/json'
  }
}