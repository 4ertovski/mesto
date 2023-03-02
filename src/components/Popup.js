export default class Popup {
  constructor (popupElement) {
    this._popup = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose= this._handleOverlayClose.bind(this)
    this._submitButton = this._popup.querySelector('.popup__button_active_submit')
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
    document.removeEventListener('click',this._handleOverlayClose);

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close())

  }

  loaderHandler(textMessage) {
    this._submitButton.textContent = textMessage
  }

}