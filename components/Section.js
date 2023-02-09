export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
  // публичный метод, отвечающий за отрисовку всех элементов
  renderItems() { 
    this._items.forEach((item) => {
      this._renderer(item); //отрисовка каждого элемента осуществляется функцией renderer 
    });
  }
}


// класс отвечает за отрисовку элементов на странице
// 1-й параметр конструктора -- объект с двумя свойствами: items и renderer
// items -- массив данных, которые нужно добавить на страницу при инициализации класса
// renderer -- функция, которая отвечает за создание и отрисовку данных на странице
// 2-й параметр -- селектор контейнера, в который нужно добавлять созданные элементы
