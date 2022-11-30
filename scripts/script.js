const popup = document.querySelector ('.popup');
const buttonEditOpen = document.querySelector ('.profile__button_active_edit');
const buttonClose = document.querySelector ('.popup__button_active_exit');
const profileName = document.querySelector ('.profile__name');
const profileTitle = document.querySelector ('.profile__definition');
const editForm = document.querySelector ('.popup__form');
const nameInput = editForm.querySelector ('.popup__input_profile_name');
const titleInput =  editForm.querySelector ('.popup__input_profile_title');
// Открыть Popup
function openPopup () {
  popup.classList.add ('popup_opened');
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
}
// Закрыть Popup
function closePopup ()  {
popup.classList.remove ('popup_opened');
}
// Заполнить форму 
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileTitle.textContent = `${titleInput.value}`;
    closePopup ();
}
// Слушатели событий 
buttonEditOpen.addEventListener ('click', openPopup);
buttonClose.addEventListener ('click', closePopup);
editForm.addEventListener('submit', formSubmitHandler);