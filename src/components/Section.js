export default class Section {
    constructor(renderer, containerSelector) {
        //функция-колбэк описана в индексе
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /* Можно было бы сделать функцию renderer обычной функцией создания карточки (без вставки ее в DOM),
    тогда в методе addItem можно было бы сразу создавать карточку и тут же вставлять ее в DOM.
    Тогда в index.js не нужно было бы отдельно создавать функцию createCard, чтобы в 2х местах создавать карточки.*/
    addItem(item) {
        const card = this._renderer(item);
        this._container.prepend(card);
    }

    renderItems(items) {
        items.forEach(item => {
            this.addItem(item);
        });
    }
}