export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorSelector: '.popup__input-error',
    submitBtnSelector: '.popup__button_active_submit',
    inactiveBtnClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__input-error_active',
  };

  // Переменные:

//profile 
export const formEditProfile = document.querySelector(".popup__form_profile");

// метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов.
//Если совпадений не найдено, возвращает значение null.

export const profileEdit = document.querySelector(".profile__button_active_edit"); //кнопка, открывающая попап с информацией о пользователе
export const profileAddButton = document.querySelector(".profile__button_active_add"); //кнопка, открывающая попап с возможностью добавления карточки

//elements
export const formAddElement = document.querySelector(".popup__form_element");
export const cardsContainer = document.querySelector('.elements');  
export const templateCard = document.querySelector('#card-template').content.querySelector('.element'); 
//Элемент <template> предназначен для хранения «образца» разметки, невидимого и предназначенного для вставки куда-либо.
//Содержимое тега <template> обрабатывается браузером. Оно доступно как DocumentFragment в свойстве тега content. Предполагается,
//что мы, при необходимости, возьмём content и вставим, куда надо.

//popup
export const popupProfileEdit = document.querySelector('.popup_profile'); //попап с возможностью исправить информацию о пользователе
export const popupElementAdd = document.querySelector('.popup_element'); //попап позволяющий добавить фото
export const popupItemOpen = document.querySelector(".popup_img"); //попап открывающий фото

export const profileTitle = popupProfileEdit.querySelector('.popup__title');
export const elementTitle = popupElementAdd.querySelector('.popup__title');

export const itemOpenImage = document.querySelector('.popup__item');
export const itemOpenTitle = document.querySelector('.popup__item-subject');

export const imageElemTitle = document.querySelector('.popup__item-subject');
export const imageElemImage = document.querySelector('.popup__item');

export const profileName = document.querySelector(".profile__name"); //имя пользователя
export const profileDefinition = document.querySelector(".profile__definition"); //род деятельности
export const profileNameInput = formEditProfile.querySelector('.popup__input_profile_name');
export const profileTitleInput = formEditProfile.querySelector('.popup__input_profile_title');


export const saveCardButton = document.querySelector('.popup__button_active_save_card');
export const formAddCard = document.querySelector(".popup__form_element");

export const cardTitle = document.querySelector('.popup__input_element_name');
export const cardURL = document.querySelector('.popup__input_element_url');
export const popupButton = document.querySelector('.popup__button');

export const popups = document.querySelectorAll('.popup');
