
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from '../components/UserInfo.js';
import {
  config,
  popupFormProfile,
  popupFormCard,
  popupFormAvatar,
  userSetting,
  popupImage,
  popupAvatar,
  popupDeleteCard,
  editProfileButton,
  popupProfile,
  nameInput,
  jobInput,
  addCardButton,
  popupCard,
  apiConfig,
  avatarEditButton
} from '../utils/variable.js'

import './index.css';


const validationFormProfile= new FormValidator(config, popupFormProfile);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(config, popupFormCard);
validationFormCard.enableValidation();
const validationFormAvatar = new FormValidator(config, popupFormAvatar);
validationFormAvatar.enableValidation()


const userInfoProfile = new UserInfo(userSetting);
const api = new Api(apiConfig);


const popupWithAddForm = new PopupWithForm(popupCard, {
  submitForm: (item) => {
    api.postUserCard(item)
        .then((item) => {
            createCard(item, false)
          popupWithAddForm.close()
        })
        .catch((err) => {
          console.log(err);
        })
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, res]) => {
      userInfoProfile.setUserInfo(userData);
      const myID = userData._id

      const openPopupPlaceAdd = new PopupWithForm(popupCard, {
        submitForm: (item) => {
          api.postUserCard(item)
              .then((item) => {
                createCard(item, false)
                openPopupPlaceAdd.close()
              })
              .catch((err) => {
                console.log(err);
              })
        }
      })

      const cards = new Section({
        renderer: (item => createCard(item, true))
      }, '.elements');
      cards.renderItems(res);


      openPopupPlaceAdd.setEventListeners();

      function createCard(item, boolean) {
        const card = new Card(item, '#card-template', myID, {

          handleCardClick: () => {
            popupWithImage.open(item.name, item.link);
          },

          handleRemoveCard: () => {
            openPopupConfirm.open();
            openPopupConfirm.setHandleSubmit(() => {
                  api.deleteCard(card._id)
                      .then(() => {
                        card.removeCard();
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                }
            );
          },

          handleLikeSet: () => {
            api.putLike(item._id)
                .then((item) => {
                  card.counterLike(item.likes);
                  card.toggleLike();
                })
                .catch((err) => {
                  console.log(err);
                })
          },

          handleLikeRemover: () => {
            api.deleteLike(item._id)
                .then((item) => {
                  card.counterLike(item.likes);
                  card.toggleLike();
                })
                .catch((err) => {
                  console.log(err);
                })
          },

        })
        if (boolean === true) {cards.addItemAppend(card.generateCard())}
        else cards.addItemPrepend(card.generateCard())

      }

    })
    .catch(err => console.log(err))


const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const openPopupAvatar = new PopupWithForm(popupAvatar, {
  submitForm: (item) => {
    api.patchAvatar(item)
        .then((data) => {
          userInfoProfile.setUserAvatar(data);
          openPopupAvatar.close()
        })
        .catch((err) => {
          console.log(err);
        })
  }
})
openPopupAvatar.setEventListeners();

const profileForm = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    api.patchUserProfile(item)
        .then((res)=> {
          userInfoProfile.setUserInfo(res)
          profileForm.close()
        })
        .catch((err) => {
          console.log(err);
        })
  }
})

profileForm.setEventListeners();

const openPopupConfirm = new PopupWithConfirmation(popupDeleteCard)
openPopupConfirm.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const profile = userInfoProfile.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.about;
  validationFormProfile.resetValidation()
  profileForm.open();
});

addCardButton.addEventListener('click', () => {
  validationFormCard.resetValidation()
  popupWithAddForm.open();
})

avatarEditButton.addEventListener('click', () => {
  validationFormAvatar.resetValidation()
  openPopupAvatar.open()
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

