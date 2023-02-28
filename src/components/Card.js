export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardLike, handleDeleteCard, handleCardLikeDelete) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._user = data.user;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardLikeDelete = handleCardLikeDelete;
    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector(
        ".element__like-button"
    );
    this._elementLikeCounter = this._element.querySelector(".element__like-button_counter")
  }


  _getTemplate() {
    const templateElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".element")
        .cloneNode(true);
    return templateElement;
  };

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  likesLength(likes) {
    if (likes.length === 0) {
      this._elementLikeCounter.textContent = '';
    } else {
      this._elementLikeCounter.textContent = likes.length;
    }
  }

  _likeActive() {
    this._likes.forEach((like) => {
      if (this._user === like._id) {
        this._elementLikeButton.classList.add('element__like_active');
      }
    });
  }

  isLiked() {
    this._elementLikeButton.classList.add('element__like_active');
  }

  dislike() {
    this._elementLikeButton.classList.remove('element__like_active');
  }

  _setEventListener() {
    this._image = this._element.querySelector('.element__item');
    this._elementLikeButton.addEventListener('click', () => {
      if (this._elementLikeButton.classList.contains('element__like_active')) {
        this._handleCardLikeDelete();
      } else {
        this._handleCardLike();
      }
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', this._handleDeleteCard);
    this._image.addEventListener('click', this._handleCardClick);
  }
  generateCard() {
    this._setEventListener();

    this._elementLikeCounter(this._likes);
    this._likeActive();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__subject').textContent = this._name;
    if (this._ownerId === this._user) {
      this._element.querySelector('.element__trash-button').classList.add('element__delete_active');
    }

    return this._element;
  }

}


/*
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__item");
    this._elementTitle = this._element.querySelector(".element__subject");
    this._elementLikeButton = this._element.querySelector(
        ".element__like-button"
    );
    this._elementLikeCounter = this._element.querySelector(".element__like-button_counter")
    this._elementDeleteButton = this._element.querySelector(
        ".element__trash-button"
    );

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = `${this._likes.length}`;

    if (this._likes.find((like) => like._id === this._owner)) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }
    if (this._id._id === this._owner) {  // если создатель карты - я, то навесить на карту кнопку удаления
      this._element.querySelector('.element__trash-button').classList.add('element__trash-button_visible');
    }

    this._setEventListeners();

    return this._element;
  }
  setCardLikes(data) {
    const likesCounter = this._element.querySelector(".element__like-button_counter");
    likesCounter.textContent = data.length;
  }
 isLiked() {
  const userLike = this._element.querySelector('.element__like-button');
  if (userLike.classList.contains('element__like-button_active')) {
    this._handleCardLikeDelete()
  } else {
    this._handleCardLike()}
}
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._elementImage.addEventListener("click", this._handleCardClick);
    this._elementDeleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });
    this._elementLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });
  }
}*/


/*
JSON c массивом карточек:
    [
      {
        "likes": [],
        "_id": "5d1f0611d321eb4bdcd707dd",
        "name": "Байкал",
        "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        "owner": {
          "name": "Jacques Cousteau",
          "about": "Sailor, researcher",
          "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
          "_id": "ef5f7423f7f5e22bef4ad607",
          "cohort": "local"
        },
        "createdAt": "2019-07-05T08:10:57.741Z"
      },
    ]
    */
