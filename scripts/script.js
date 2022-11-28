const popup = document.querySelector ('.popup');
const buttonEditOpen = document.querySelector ('.profile__button_active_edit');
const buttonClose = document.querySelector ('.popup__button_active_exit');
const getName = document.querySelector ('.profile__name');
const getTitle = document.querySelector ('.profile__definition');
const editForm = document.querySelector ('.popup__container');
let nameInput = editForm.querySelector ('.popup__input_name');
let titleInput =  editForm.querySelector ('.popup__input_title');

function openPopup () {
  popup.classList.add ('popup__opened');
  nameInput.value = getName.textContent;
  titleInput.value = getTitle.textContent;
}

function closePopup ()  {
popup.classList.remove ('popup__opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getTitle.textContent = `${titleInput.value}`;
    closePopup ();
}

buttonEditOpen.addEventListener ('click', openPopup);
buttonClose.addEventListener ('click', closePopup);
editForm.addEventListener('submit', formSubmitHandler);
