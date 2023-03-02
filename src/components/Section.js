export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItemAppend(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }
}


// класс отвечает за отрисовку элементов на странице
// 1-й параметр конструктора -- объект с двумя свойствами: items и renderer
// items -- массив данных, которые нужно добавить на страницу при инициализации класса
// renderer -- функция, которая отвечает за создание и отрисовку данных на странице
// 2-й параметр -- селектор контейнера, в который нужно добавлять созданные элементы
