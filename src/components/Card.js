export default class Card {
  constructor (data, cardSelector, myID, {handleCardClick, handleRemoveCard, handleLikeSet, handleLikeRemover}) {

    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._myID = myID;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeSet = handleLikeSet;
    this._handleLikeRemover = handleLikeRemover
    this._card = this._getTemplateLayout();
    this._likeButton = this._card.querySelector('.element__like-button');
    this._trashButton =  this._card.querySelector('.element__trash-button');

  }

  _getTemplateLayout () {
    const templateElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".element")
        .cloneNode(true);
    return templateElement;
  }

  generateCard() {
    const popupImageText = this._card.querySelector('.element__subject');
    this._popupImage = this._card.querySelector('.element__item');
    this._likeCounter = this._card.querySelector('.element__like-button_counter');

    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    popupImageText.textContent = this._name;
    this._likeCounter.textContent = `${this._likes.length}`;

    if (this._likes.find((like) => like._id === this._myID)) {
      this._likeButton.classList.add('element__like-button_active');
    };


    if (this._owner._id === this._myID) {
      this._trashButton.classList.add('element__trash-button_active')
    }

    this._setCardListeners()
    return this._card;
  }

  counterLike(likeArray) {
    const counterValue = this._likeCounter
    counterValue.textContent = likeArray.length;
  }


  toggleLike() {  // смена состояния кнопки
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _setLikeHandler() {
    const userLike = this._likeButton;
    if (userLike.classList.contains('element__like-button_active')) {
      this._handleLikeRemover()
    } else {
      this._handleLikeSet()}
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _setCardListeners () {
    this._likeButton.addEventListener('click', () => this._setLikeHandler());
    this._trashButton.addEventListener('click', () => this._handleRemoveCard(this._card));
    this._popupImage.addEventListener('click',() => this._handleCardClick());
  }
}