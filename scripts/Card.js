import openImage from './index.js';

export default class Card {
constructor(data, templateSelector, openImage) {
  this._name = data.name;
  this._link = data.link;
  this._templateSelector = templateSelector;
  this._openImage = openImage;
}
_getTemplate() {
  const templateElement = document.querySelector(this._templateSelector)
  .content.querySelector(".element")
  .cloneNode(true);
return templateElement;
}
generateCard() {
  this._element = this._getTemplate();
  this._elementImage = this._element.querySelector(".element__item");
  this._elementTitle = this._element.querySelector(".element__subject");
  this._elementLikeButton = this._element.querySelector(
    ".element__like-button"
  );
  this._elementDeleteButton = this._element.querySelector(
    ".element__trash-button"
  );

  this._elementImage.src = this._link;
  this._elementImage.alt = this._name;
  this._elementTitle.textContent = this._name;

  this._setEventListeners();

  return this._element;
}
  
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._openImage(this._name, this._link);
    });
    this._elementDeleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });
    this._elementLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });
  }
}

/*
export default class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector)
    const cardElement = templateElement.content.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _likeCard(e) { 
    e.target.classList.toggle("element__like-button_active");
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__item");
    this._elementTitle = this._element.querySelector(".element__subject");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
  
    this._setEventListeners();
  
    return this._element;
  };

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
    this._openImage(this._name, this._link);
    });
    this._element.querySelector(".element__trash-button").addEventListener("click", this._deleteCard);
    this._element.querySelector(".element__like-button").addEventListener("click", this._likeCard);
  };
   
}
*/