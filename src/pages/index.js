//импорт классов
import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//импорт переменных
import {
    //initialCards,
    config,
    formEditProfile,
    profileEdit,
    profileAddButton,
    formAddElement,
    cardsContainer,
    popupProfileEdit,
    popupElementAdd,
    popupItemOpen,
    profileName,
    profileDefinition,
    profileNameInput,
    profileTitleInput,
    userAvatar,
    popupAddAvatarForm,
    popupAddAvatar,
    popupDeleteCard,
    popupCloseButtonAddCard,
    popupCloseButtonProfileEdit,
    avatarContainer,
    popupDeleteCardForm,
} from "../utils/variable.js";
let userId;

const api = new Api({baseUrl:'https://mesto.nomoreparties.co/v1/cohort-60',
    headers:
        {
            authorization: '3aa61c49-fdf8-469f-ac89-ecfdfa4ec988',
            'Content-Type': 'application/json',
        }
});

// метод для валидации форм: профайл, добавление карточки, добавление аватара

const validationFormCard = new FormValidator(config, formAddElement);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

const validationAvatarForm = new FormValidator(config, popupAddAvatar);
validationAvatarForm.enableValidation();

// создание новой карточки: лайки, снятие лайка
// удаление своей карточки
// обновление информации о пользователе
// обновление аватара пользователя


const cards = new Section((data) => {
    const cardItem = handleNewCard(data).generateCard();
    cards.addItem(cardItem);
},
    ".elements"
);

const dataUserInfo = new UserInfo({
    profileName: ".profile__name",
    profileDefinition: ".profile__definition",
    userAvatar: ".profile__avatar-image",
})


// открыть превью картинки
const imageOpen = new PopupWithImage(popupItemOpen);
imageOpen.setEventListeners();

const popupWithInfoForm = new PopupWithForm(popupProfileEdit, (data) => {
    popupWithInfoForm.renderLoading(true, "Сохранение...");
    api.updateUserInfo(data)
        .then((userInfo) => {
            dataUserInfo.setUserInfo(userInfo);
            popupWithInfoForm.close();
        })
        .catch((err) => {
            popupWithInfoForm.renderLoading(true, "Ошибка отправки формы")
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            popupWithInfoForm.renderLoading(false);})
})

popupWithInfoForm.setEventListeners();

popupCloseButtonProfileEdit.addEventListener('click', () => {
    popupWithInfoForm.close();
});

const popupWithAddForm = new PopupWithForm(popupElementAdd, (data) => {
    popupWithAddForm.renderLoading(true, "Сохранение...");
    api.addNewCard(data)
        .then((card) => {
            cards.addItem(handleNewCard(card).generateCard());
            popupWithAddForm.close();
        })
        .catch((err) => {
            popupWithAddForm.renderLoading(true, "Ошибка отправки формы");
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupWithAddForm.renderLoading(false);})
})

popupWithAddForm.setEventListeners();

// Закрытие формы редактирования профиля
popupCloseButtonAddCard.addEventListener('click', () => {
    popupWithAddForm.close();
});
profileEdit.addEventListener("click", () => {
    popupWithInfoForm.open();
    profileNameInput.value = profileName.textContent;
    profileTitleInput.value = profileDefinition.textContent;
    validationForm.resetValidation();
});

const popupRemoveCard = new PopupWithConfirmation(popupDeleteCardForm, (card) => {
    popupRemoveCard.renderLoading(true, "Удаление...");
    api.deleteCard(card._data._id)
        .then(() => {
            card.deleteCard();
            popupRemoveCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupRemoveCard.renderLoading(false);})
})
 popupRemoveCard.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupAddAvatarForm, (data) => {
    popupEditAvatar.renderLoading(true, 'Сохранение...');
    api
        .updateAvatar(data.link)
        .then((data) => {
            dataUserInfo.setUserInfo(data);
            popupEditAvatar.close();
        })
        .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
    })
        .finally(() => {
            popupEditAvatar.renderLoading(false);})
})
popupEditAvatar.setEventListeners()
Promise.all([api.updateUserInfo(), api.getCards()])
.then(([info, initialCards]) => {
   const userId = info._id;
    dataUserInfo.setUserInfo(info);
    cards.renderItems(initialCards);
})
    .catch((err) => {
        console.log(err);
    });


function handleCardClick(e) {
    imageOpen.open(e.target);
}
function handleRemoveCard(data) {
    popupRemoveCard.open(data);
}
function handleNewCard(card) {
    const newCard = new Card(
        card,
        '#card',
        handleCardClick,
        userId,
        () => handleRemoveCard(newCard),
        () => {
            api
                .likeCard(card._id)
                .then((res) => {
                    newCard.likesLength(res.data);
                    newCard.isLiked();
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        },
        () => {
            api
                .dislikeCard(card._id)
                .then((res) => {
                    newCard.likesLength(res.data);
                    newCard.dislike();
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
    );
    return newCard;
}

profileEdit.addEventListener("click", () => {
    popupWithInfoForm.open();
    const { name, about } = dataUserInfo.getUserInfo();
    profileNameInput.value = name;
    profileTitleInput.value = about;
    validationForm.resetValidation();
});
profileAddButton.addEventListener("click", () => {
    popupWithAddForm.open();
    validationFormCard.resetValidation();
});
    avatarContainer.addEventListener('click', () => {
        popupEditAvatar.open();
        validationAvatarForm.resetValidation();
    });


/*
api.getUserInfo()
    .then(data => {
        const {name, about, avatar} = data;
            profileName.textContent =  name;
            profileDefinition.textContent = about;
            userAvatar.src = avatar;
    })
    .catch((err) => {
        console.error(`Ошибка загрузки начальных данных. Ошибка: ${err}.`);
    });

let userId = null
let cardsArr = [];
let cardsList = {};

//Изначальная отрисовка данных о пользователе
api.getCards()
    .then((data) => {
        console.log(`Информация получена с сервера.`);
        userId = userInfo._id
        //Создадим массив из карточек из итогового массива
        cardsArr = data.map(serverItem => {
            return {
                name: serverItem.name,
                link: serverItem.link,
                likes: serverItem.likes
            };
        })
        const createCard = (param) => {
            const card = new Card(param, '#card-template', {
                handleCardClick: () => {
                    popupItemOpen.open(param);
                }
            });
            return card;
        }
        // Вставляем карточки в разметку
        cardsList = new Section({
                items: cardsArr,
                renderer: (list) => {
                    const card = createCard(list)
                    const cardElement = card.generateCard();
                    cardsList.addItem(cardElement);
                }
            },
            cardsContainer);
        cardsList.renderItems();

    })
    .catch((err) => {
        console.log(`Ошибка загрузки начальных данных. Ошибка: ${err}.`);
        cardsArr = initialCards;
    })
const renderLoading = (popup, isLoading = false, title = 'Сохранить', loadingTitle = 'Сохранение...') => {
    const button = popup.querySelector('.popup__button_active_submit')

    button.textContent = isLoading ? loadingTitle : title
}

const popupWithAddForm = new PopupWithForm(popupElementAdd, {
    submit: (data) => {
        renderLoading(popupElementAdd, true, 'Создать', 'Создание...')

        api
            .addCard(data)
            .then(data => {
                cardsList.addItem(cardElement(data))
                popupWithAddForm.close()
            })
            .catch(err => console.log(`Не удалось сохранить карточку. Ошибка:${err}`))
            .finally(() => {
                renderLoading(postNewCard, false, 'Создать', 'Создание...')
            })
    }
});

const popupWithInfoForm = new PopupWithForm(popupProfileEdit, {
    submit: (data) => {
        api.updateUserInfo({
            name: data['name'],
            about: data['about']
        })
            .then((info) => {
                userInfo.setUserInfo({
                    name: info.name,
                    about: info.about
                });
                profileName.textContent = profileNameInput.value;
                profileDefinition.textContent = profileTitleInput.value;
                popupWithInfoForm.close();
            })
            .catch(err => console.log(`Ошибка при обновлении информации о пользователе. Ошибка: ${err}`));
    }
});
*/


/*

//ВАЛИДАЦИЯ ФОРМ на основе класса
const validationFormCard = new FormValidator(config, formAddElement);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

const userInfo = new UserInfo({
  name: profileName,
  definition: profileDefinition,
  avatar: userAvatar,
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
   // items: initialCards,
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
});*/

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

/*
popupWithProfileEditForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupWithAddForm.open();
});

popupCloseButtonProfileEdit.addEventListener("click", () => {
  popupWithProfileEditForm.close();
});

popupCloseButtonAddCard.addEventListener("click", () => {
  popupWithAddForm.close();
});
*/
