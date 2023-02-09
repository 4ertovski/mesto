//импорт классов
//import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

//импорт переменных
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
  templateCard,
  //saveCardButton,
} from "../utils/variable.js";

//ВАЛИДАЦИЯ ФОРМ на основе класса
const validationFormCard = new FormValidator(config, formAddElement);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

const userInfo = new UserInfo({
  name: profileName,
  definition: profileDefinition,
});

const imageOpen = new PopupWithImage(popupItemOpen);
imageOpen.setEventListeners();

function handleCardClick(e) {
  imageOpen.open(e.target);
}

function createNewCard(data) {
  const newCard = new Card(
    data,
    "#card-template",
    handleCardClick
  ).generateCard();
  return newCard;
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardItem = createNewCard(data);
      cards.addItem(cardItem);
    },
  },
  cardsContainer
);
cards.renderItems();

const popupWithAddForm = new PopupWithForm(popupElementAdd, (data) => {
  cards.addItem(createNewCard(data));
});
popupWithAddForm.setEventListeners();

const popupWithProfileEditForm = new PopupWithForm(popupProfileEdit, (data) =>
  userInfo.setUserInfo(data)
);
popupWithProfileEditForm.setEventListeners();

profileEdit.addEventListener("click", () => {
  popupWithProfileEditForm.open();
  const { name, definition } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileTitleInput.value = definition;
  validationForm.resetValidation();
});

profileAddButton.addEventListener("click", () => {
  popupWithAddForm.open();
  validationFormCard.resetValidation();
});

/*
const createCard = (data) => {
  const card = new Card(data, "#card-template", {
    handleCardClick: () => {
      imageOpen.open(data.name, data.link);
    },
  });
  return card;
};

const cards = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      const cardItem = card.generateCard();
      cards.addItem(cardItem);
    },
  },
  cardsContainer
);

cards.renderItems();

const popupWithAddForm = new PopupWithForm(popupElementAdd, {
  submit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupWithAddForm.setEventListeners();

const popupWithProfileEditForm = new PopupWithForm(popupProfileEdit, {
  submit: (data) => {
    userInfo.setUserInfo(data);
  },
});

popupWithProfileEditForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupWithAddForm.open();
  validationFormCard.resetValidation();
});

profileEdit.addEventListener("click", () => {
  popupWithProfileEditForm.open();
  //userInfo.getUserInfo();
  const { name, definition } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileTitleInput.value = definition;
  validationForm.resetValidation();
});
*/
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

/* extends -- Ключевое слово extends используется в объявлении класса или в выражениях класса для создания дочернего класса.*/

/* super -- Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.*/

/* Колбэк-функция (или обратный вызов) -- это функция, переданная в другую функцию в качестве аргумента,
 которая затем вызывается по завершению какого-либо действия.*/

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
/*
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

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  //popup.removeEventListener("mousedown", closeByClickOverlay);
}

//Закрытие попапа нажатием на Esc
function closeByEscape(e) {
  const key = e.key;
  if (key === "Escape" || key === "Esc") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//Закрытие попапа нажатием на оверлей

function closeByClickOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}


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
  //validationForm.activateButton();

  openPopup(popupProfileEdit);
}

/// Кнопка добавления фотографии

function openAddPopup() {
  openPopup(popupElementAdd);
  validationFormCard.resetValidation();
  //formAddCard.reset();
}

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
*/
