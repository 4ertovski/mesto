
// Переменные:

//profile 
const formEditProfile = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name"); //имя пользователя
/*метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов.
Если совпадений не найдено, возвращает значение null.*/
const profileDefinition = document.querySelector(".profile__definition"); //род деятельности
const profileEdit = document.querySelector(".profile__button_active_edit"); //кнопка, открывающая попап с информацией о пользователе
const profileAddButton = document.querySelector(".profile__button_active_add"); //кнопка, открывающая попап с возможностью добавления карточки

//elements
const cardsContainer = document.querySelector('.elements');  
const templateCard = document.querySelector('#card-template').content.querySelector('.element'); 
/*Элемент <template> предназначен для хранения «образца» разметки, невидимого и предназначенного для вставки куда-либо.
Содержимое тега <template> обрабатывается браузером. Оно доступно как DocumentFragment в свойстве тега content. Предполагается,
что мы, при необходимости, возьмём content и вставим, куда надо.*/

//popup
const popupProfileEdit = document.querySelector('.popup__profile'); //попап с возможностью исправить информацию о пользователе
const popupElementAdd = document.querySelector('.popup__element'); //попап позволяющий добавить фото
const popupItemOpen = document.querySelector(".popup__image"); //попап открывающий фото


const profileTitle = popupProfileEdit.querySelector('.popup__title');
const profileNameInput = formEditProfile.querySelector('.popup__input_profile_name');
const profileTitleInput = formEditProfile.querySelector('.popup__input_profile_title');

const elementTitle = popupElementAdd.querySelector('.popup__title');
const elementNameInput = document.querySelector('.popup__input_element_name');
const elementLinkInput = document.querySelector('.popup__input_element_url'); 

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

imageElemTitle = document.querySelector('.popup__item-subject');
imageElemImage = document.querySelector('.popup__item');

function openImage(item) {
    imageElemTitle.textContent = item.name;
    imageElemImage.src = item.link;
    openPopup(popupItemOpen);
}

const itemOpenButtonClose = document.querySelector('.popup__button_item_exit');

function closePopupListener(){
  closePopup(currentPopup)
  currentPopup = null;
}
itemOpenButtonClose.addEventListener("click", function () {
  closePopup(popupItemOpen);
});


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

//Объявляем текущий попап, для того чтобы при вызове функции closePopup(), автоматически определялось какой попап открыт.
 currentPopup = null; 

///Кнопка редактирования профиля

// Функция для открытия попапа
function openEditPopup(){
    openPopup(popupProfileEdit);
    currentPopup = popupProfileEdit;
}

// Добавляем на кнопку событие, которое по клику вызывает функцию, показывающую попап
profileEdit.addEventListener('click', openEditPopup);

/// Кнопка добавления фотографии

function  openAddPopup(){
    openPopup(popupElementAdd)
    currentPopup = popupElementAdd;
}

profileAddButton.addEventListener('click', openAddPopup);

///Кнопка "Закрыть"

//То же что и profileButtonExit, за исключением того что в этом случае находит все кнопки закрытия, а не только одну - самую первую.

const allCloseButtons = document.querySelectorAll('.popup__button_active_exit');

function closePopupListener(){
    closePopup(currentPopup)
    currentPopup = null;
}

//Добавляем каждой кнопке слушатель на клик и при клике вызываем вышестоящую функцию
allCloseButtons.forEach(function (elem){
    elem.addEventListener('click', closePopupListener)
})

///Кнопка "Сохранить" в редактировании профиля

const saveProfileButton = document.querySelector('.popup__button_active_save-profile');

//Информация на странице
const mainName = document.querySelector('.profile__name');
const mainDefinition = document.querySelector('.profile__definition');

//Информация в форме редактирования
const inputName = document.querySelector('.popup__input_profile_name');
const inputDefinition = document.querySelector('.popup__input_profile_title')

function saveProfileInfo(){
    mainName.textContent = inputName.value; // Ставим имени на главной странице значение инпут поля
    mainDefinition.textContent = inputDefinition.value; // Ставим области деятельности на главной странице значение инпут поля

    closePopup(currentPopup); //Закрываем текущий попап при сохранении
    currentPopup = null;
}

saveProfileButton.addEventListener('click', saveProfileInfo)

///Добавление новых картинок
const saveCardButton = document.querySelector('.popup__button_active_save-card');

const cardTitle = document.querySelector('.popup__input_element_name');
const cardURL = document.querySelector('.popup__input_element_url');

function saveCardInfo(){
    name = cardTitle.value
    link = cardURL.value
    const item = {name,link}
    renderElement(item, cardsContainer);

    closePopup(currentPopup);
    currentPopup = null;
}

saveCardButton.addEventListener('click', saveCardInfo);

//Закрытие поля при клике вне дива

//Если попап не равен null, т.е. открыт - исполняем код, в противном случае ничего не делаем
document.addEventListener('click', function(e){
    if (currentPopup != null){
        //Если элемент на который мы кликнули имеет класс 'popup'(этот класс есть только у внешней части попапа), тогда закрываем его, в противном случае ничего не делаем.
        if (e.target.classList.contains('popup')){
            //Если текущий попап не попал в клик - закрываем его
            closePopup(currentPopup);
            currentPopup = null;
        }
    }
})

// заметки на полях:

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