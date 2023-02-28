export default class Popup {
  // принимает в конструктор единственный параметр -- селектор попапа
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // публичные методы, отвечающие за открытие и закрытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  // приватный метод, который содержит логику закрытия попапа клавишей ESC
  _handleEscClose(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      this.close();
    }
  }
  // публичный метод, который добавляет слушатель клика иконке закрытия попапа + закрытие при клике на оверлей
  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
