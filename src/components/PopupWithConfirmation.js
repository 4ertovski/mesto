import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor (popupElement) {
        super(popupElement);
        this._submitButton = this._popup.querySelector('.popup__button_active_submit')
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.loaderHandler('Удаление...');
            this._handleSubmit();
            this.close();
        });
        super.setEventListeners();
    }

    setHandleSubmit(func) {
        this._handleSubmit = func;
    }

    open() {
        this.loaderHandler('Да');
        super.open();
    }
}