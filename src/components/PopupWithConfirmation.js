import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            this._handleFormSubmit(e);
        })
    }
    setCard() {
        this._card = card;
    }
    getCard() {
       return  this._card;
    }
}