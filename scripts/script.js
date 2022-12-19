
// Переменные:

//profile 
const formEditProfile = document.querySelector(".popup__form_profile");

/*метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов.
Если совпадений не найдено, возвращает значение null.*/

const profileEdit = document.querySelector(".profile__button_active_edit"); //кнопка, открывающая попап с информацией о пользователе
const profileAddButton = document.querySelector(".profile__button_active_add"); //кнопка, открывающая попап с возможностью добавления карточки

//elements
const cardsContainer = document.querySelector('.elements');  
const templateCard = document.querySelector('#card-template').content.querySelector('.element'); 
/*Элемент <template> предназначен для хранения «образца» разметки, невидимого и предназначенного для вставки куда-либо.
Содержимое тега <template> обрабатывается браузером. Оно доступно как DocumentFragment в свойстве тега content. Предполагается,
что мы, при необходимости, возьмём content и вставим, куда надо.*/

//popup
const popupProfileEdit = document.querySelector('.popup_profile'); //попап с возможностью исправить информацию о пользователе
const popupElementAdd = document.querySelector('.popup_element'); //попап позволяющий добавить фото
const popupItemOpen = document.querySelector(".popup_item"); //попап открывающий фото

const profileTitle = popupProfileEdit.querySelector('.popup__title');
const elementTitle = popupElementAdd.querySelector('.popup__title');

const itemOpenImage = document.querySelector('.popup__item');
const itemOpenTitle = document.querySelector('.popup__item-subject');



const initialCards = [{
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

/// Открытие закрытие попапов
function openPopup (popupElement) {
  popupElement.classList.add("popup_opened")
}

function closePopup (popupElement) {
  popupElement.classList.remove("popup_opened")
}

/// Открытие попапа просмотра картинок

const imageElemTitle = document.querySelector('.popup__item-subject');
const imageElemImage = document.querySelector('.popup__item');

function openImage(item) {
  imageElemTitle.textContent = item.name;
  imageElemImage.src = item.link;
  imageElemTitle.alt = item.name;

    openPopup(popupItemOpen);
}

// Функция для открытия попапа

const profileName = document.querySelector(".profile__name"); //имя пользователя
const profileDefinition = document.querySelector(".profile__definition"); //род деятельности
const profileNameInput = formEditProfile.querySelector('.popup__input_profile_name');
const profileTitleInput = formEditProfile.querySelector('.popup__input_profile_title');

function openEditPopup(e){
e.preventDefault();
profileNameInput.value = profileName.textContent;
profileTitleInput.value = profileDefinition.textContent;
    openPopup(popupProfileEdit);
};

// Добавляем на кнопку событие, которое по клику вызывает функцию, показывающую попап
profileEdit.addEventListener('click', openEditPopup);

/// Кнопка добавления фотографии

function  openAddPopup(){
  openPopup(popupElementAdd)
}

profileAddButton.addEventListener('click', openAddPopup);


/// Функция создает массив по элементам
//начало 
function createElement(item) {
  //создаем элемент с данными из переменной где хранится темплейт
  const elementCard = templateCard.cloneNode(true);
  const elementTitle = elementCard.querySelector(".element__subject");
  const elementImage = elementCard.querySelector(".element__item");
  const elementLikeButton = elementCard.querySelector(".element__like-button");
  const elementDeleteButton = elementCard.querySelector(".element__trash-button");

  elementImage.src = item.link;
  elementTitle.textContent = item.name;
  elementImage.alt = item.name;

  /*Обработчик событий для кнопок лайков, удаления карточек с картинками
   и просмотра картинок (все в одной функции)*/
  elementLikeButton.addEventListener("click", addLike);
  elementDeleteButton.addEventListener("click", clickDelete);
  elementImage.addEventListener("click", () => openImage(item)); 
  return elementCard;
  } //конец

  /// Добавление и удаление лайка
function addLike(e) {
  e.target.classList.toggle("element__like-button_active");
}

/// Удаление карточки
function clickDelete(e) {
  e.target.closest(".element").remove();
}
/* Создает элемент (вызывая createElement) и добавляет его на страницу
item -объект с данными elementCard
wrapElement - элемент, в который добавится наш новый elementCard*/

function renderElement(item, wrapElement) {
  const card = createElement(item);
  wrapElement.prepend(card);
}
initialCards.forEach(function (item) {
  renderElement(item, cardsContainer);
});

// Изменение данных имени пользователя формы, preventDefault сбрасывает значения формы но дефолтных
function saveProfileInfo(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDefinition.textContent = profileTitleInput.value;
  closePopup(popupProfileEdit);
}
popupProfileEdit.addEventListener("submit", saveProfileInfo);

///Добавление новых картинок
const saveCardButton = document.querySelector('.popup__button_active_save_card');

const formAddCard = document.querySelector(".popup__form_element");

// ф-ия сохранения карточки с данными в форму

const cardTitle = document.querySelector('.popup__input_element_name');
const cardURL = document.querySelector('.popup__input_element_url');

function saveCardInfo(){
   const name = cardTitle.value
   const link = cardURL.value
   const item = {name,link}
    renderElement(item, cardsContainer);

    closePopup(popupElementAdd);
}

formAddCard.addEventListener('submit', (e)=> {
  e.preventDefault();
  saveCardInfo();
  e.target.reset();
});

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
});


/// заметки на полях:

/*Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент),
 который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.*/ 

/*Метод prepend позволяет вставить в начало какого-либо элемента другой элемент. 
Параметром метод принимает элемент, как правило созданный через createElement, либо строку.
 Можно добавить сразу несколько элементов или строк, перечислив их через запятую.*/

 /* Метод Element.append() вставляет узлы или строки с текстом в конец Element. 
Строки с текстом вставляются как текстовое содержимое. */

/* Метод .cloneNode() объекта Node создает и возвращает копию узла, для которого он был вызван.*/

/* setAttribute задает значение атрибута указанного элемента.
  Если атрибут уже существует, значение обновляется; 
  в противном случае добавляется новый атрибут с указанным именем и значением.*/

/* Метод addEventListener() позволяет добавлять обработчики событий к любому объекту */

/*Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает. 
А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.*/

/* Метод preventDefault () интерфейса Event сообщает User agent, что если событие не обрабатывается явно,
  его действие по умолчанию не должно выполняться так, как обычно.*/

/* .textContent позволяет задавать или получать текстовое содержимое элемента и его потомков.*/

/* Свойство value устанавливает или возвращает значение атрибута.*/

/* Метод forEach() вызывает функцию один раз для каждого элемента массива по порядку.*/