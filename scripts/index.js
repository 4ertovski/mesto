//импорт переменных
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  initialCards,
  config,
  formEditProfile,
  profileEdit,
  profileAddButton,
  formAddElement,
  cardsContainer,
  //templateCard,
  popupProfileEdit,
  popupElementAdd,
  popupItemOpen,
  //profileTitle,
  //elementTitle,
  //itemOpenImage,
  //itemOpenTitle,
  imageElemImage,
  imageElemTitle,
  profileName,
  profileDefinition,
  profileNameInput,
  profileTitleInput,
  //formAddCard,
  cardTitle,
  cardURL,
  //popupButton,
  popups,
  //saveCardButton,
} from "./variable.js";

//ВАЛИДАЦИЯ ФОРМ на основе класса
const validationFormCard = new FormValidator(config, formAddElement);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

/*
Если будет интересно, можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, 
а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);
 
И теперь можно использовать валидаторы для деактивации кнопки и тд

formValidators[ profileForm.getAttribute('name') ].resetValidation()

// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
formValidators['profile-form'].resetValidation()
*/

/// Открытие закрытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
  //popup.addEventListener("mousedown", closeByClickOverlay);
  //closeByClickOverlay Вам не нужна, так как овелей обрабатывается универсально с крестиками уже на 137й строчке
  //validationForm.resetValidation();
  //validationFormCard.resetValidation();
  //validationForm.disableSubmitBtn();
}

/*
validationForm.resetValidation();
  validationFormCard.resetValidation();
  validationForm.disableSubmitBtn(); 
вот это нужно удалить из openPopup
В универсальных функциях (методах) не должно быть кода, который относится только к конкретным попапам. Весь код функций должен подходить любым элементам, которые его используют.
Вам не нужно это делать, когда открываете попап картинки. Не нужно управлять кнопкой попапа добавления карточки, если открываете попап профиля и тд. Это лишние действия. Сейчас они очень незначительные, но в реальных проектах очень много логики в каждом вызове функции/метода
очищать ошибки нужно при клике на кнопку открытия профиля
а деактивировать кнопку при сабмите формы добавления карточки. (там очищать ошибки не нужно)
*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  //popup.removeEventListener("mousedown", closeByClickOverlay);
}
/*
addEventListener
при закрытии нужно удалять обработчик, а не опять  навешивать
  popup.removeEventListener('mousedown', closeByClickOverlay);
closeByClickOverlay Вам не нужна, так как овелей обрабатывается универсально с крестиками уже на 137й строчке
*/

//Закрытие попапа нажатием на Esc
function closeByEscape(e) {
  const key = e.key;
  if (key === "Escape" || key === "Esc") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//Закрытие попапа нажатием на оверлей
/*
function closeByClickOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}
*/
//closeByClickOverlay Вам не нужна, так как овелей обрабатывается универсально с крестиками уже на 137й строчке

// Открытие попапа просмотра картинок
export default function openImage(name, link) {
  imageElemTitle.textContent = name;
  imageElemImage.src = link;
  imageElemTitle.alt = name;
  openPopup(popupItemOpen);
}

//рендер карточек
function renderElement(data) {
  // создание карточек с помощью класса
  const card = new Card(data, "#card-template", openImage);
  const templateElement = card.generateCard();
  return templateElement;
}
initialCards.forEach((item) => {
  cardsContainer.append(renderElement(item));
});

// ф-ия сохранения карточки с данными в форму
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  // сами создаем объект, который будем передавать в renderElement
  const elementCard = {
    name: cardTitle.value,
    link: cardURL.value,
  };
  cardsContainer.prepend(renderElement(elementCard)); // добавляем новую карточку

  renderElement(elementCard, cardsContainer);
  closePopup(popupElementAdd);
  formAddElement.reset(); //сброс полей инпутов
}

// Функция для открытия попапа
function openEditPopup(e) {
  e.preventDefault();
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileDefinition.textContent;

  validationForm.resetValidation();
  validationForm.activateButton();

  openPopup(popupProfileEdit);
}

/// Кнопка добавления фотографии

function openAddPopup() {
  openPopup(popupElementAdd);
  validationFormCard.resetValidation();
  //formAddCard.reset();
}
/*
Очищать форму нужно только после сабмита карточки. Просто при закрытиях (открытиях) не нужно этого делать, 
чтобы пользователю не нужно было печатать опять текст в инпутах, если он закрыл форму нечаянно
 */

// Изменение данных имени пользователя формы, preventDefault сбрасывает значения формы до дефолтных

function saveProfileInfo(e) {
  e.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDefinition.textContent = profileTitleInput.value;

  closePopup(popupProfileEdit);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

formEditProfile.addEventListener("submit", saveProfileInfo);
profileEdit.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
popupElementAdd.addEventListener("submit", handleFormSubmitCard);

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
