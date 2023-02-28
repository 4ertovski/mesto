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
    config,
    formEditProfile,
    profileEdit,
    profileAddButton,
    formAddElement,
    popupProfileEdit,
    popupElementAdd,
    popupItemOpen,
    profileNameInput,
    profileTitleInput,
    popupAddAvatarForm,
    popupAddAvatar,
    popupDeleteCard,
    avatarContainer,
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

const validationAvatarForm = new FormValidator(config, popupAddAvatarForm);
validationAvatarForm.enableValidation();

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

const popupRemoveCard = new PopupWithConfirmation(popupDeleteCard, (card) => {
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


const popupEditAvatar = new PopupWithForm(popupAddAvatar, (data) => {
    popupEditAvatar.renderLoading(true, 'Сохранение...');
    api
        .updateAvatar(data.link)
        .then((data) => {
            dataUserInfo.setUserInfo(data);
            popupEditAvatar.close();
        })
        .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
        .finally(() => {
            popupEditAvatar.renderLoading(false);})
})

Promise.all([api.updateUserInfo(), api.getCards()])
.then(([data, initialCards]) => {
   const userId = data._id;
    dataUserInfo.setUserInfo(data);
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

popupWithAddForm.setEventListeners();
popupWithInfoForm.setEventListeners();
popupEditAvatar.setEventListeners();
popupRemoveCard.setEventListeners();
imageOpen.setEventListeners();

avatarContainer.addEventListener('click', () => {
    popupEditAvatar.open();
    validationAvatarForm.resetValidation();
});
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

