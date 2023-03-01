import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        console.log(this._popupForm);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector(".popup__button_active_save-card");
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._data);
        })
    }
    open(data) {
        super.open();
        this._data = data;
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
    }
