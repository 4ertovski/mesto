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
export const checkProfileContainer = document.querySelector('.popup__form_profile'); // определяем форму редактирования профиля
export const checkPlaceContainer = document.querySelector('.popup__form_element'); // определяем форму, откуда будем тянуть инпуты названия места и ссылку (попап2)
export const checkAvatarContainer = document.querySelector('.popup__form_avatar') // попап аватарки

//popups section
export const popupProfile = document.querySelector('.popup_profile');// ищем обычный попап (попап1)
export const popupPlace = document.querySelector('.popup_element'); // ищем попап новых мест (попап 2)
export const popupImage = document.querySelector('.popup_img'); //ищем попап открытия изображений (попап 3)
export const popupAvatar = document.querySelector('.popup_avatar') // попап аватарки (попап 4)
export const popupConfirm = document.querySelector('.popup_delete-card') // попап подтверждения удаления карты (попап 5)

//inputs section
export const nameInput = document.querySelector('.popup__input_profile_name'); // ищем инпут имени (попап 1)
export const jobInput = document.querySelector('.popup__input_profile_title'); //ищем инпут профессии (попап 1)

//button/listeners section
export const editProfileButton = document.querySelector('.profile__button_active_edit'); // ищем кнопку вызова попапа редактирования профиля
export const addPlaceButton = document.querySelector('.profile__button_active_add'); // ищем кнопку вызова попапа добавления нового места
export const avatarEditButton = document.querySelector('.profile__avatar-container') /*'.profile__edit-avatar'*/

//on-page selectors
export const currentName = document.querySelector('.profile__name'); // ищем текущее имя юзера на странице
export const currentJob = document.querySelector('.profile__definition'); //ищем текущуюю профессию юзера на странице
export const currentAvatar = document.querySelector('.profile__avatar')


//utiils section
export const userSetting = {
  name: currentName,
  about: currentJob,
  avatar: currentAvatar
}

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '3aa61c49-fdf8-469f-ac89-ecfdfa4ec988',
    'Content-Type': 'application/json'
  }
}