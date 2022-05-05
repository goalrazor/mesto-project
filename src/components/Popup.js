export default class Popup {
    constructor(selector) {
        //выбираем существующий попап в разметке
        this._popupElement = document.querySelector(selector);

        /* (1) Т. к. метод bind всегда создает новую ссылку на функцию,
        движок браузера просто не сможет найти функцию, чтобы ее удалить. Ошибки никакой браузер не выдаст,
        так как ему без разницы, что он не нашел функцию.
        Для того чтобы ссылка стала постоянной, нужно "привязать" функцию к контексту this
        в конструкторе 1 раз с помощью bind. НУЖНО ЗАПОМНИТЬ!11
        https://learn.javascript.ru/introduction-browser-events#addeventlistener */
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        // (2) и теперь при открытии навешиваете и передаете только ссылку:
        document.addEventListener('keydown', this._handleEscClose); // <=== только cсылку передаете ==
        this._popupElement.classList.add('popup_opened');
    }

    close() {
        // (3) и удаляете при закрытии точно с такой же ссылкой:
        document.removeEventListener('keydown', this._handleEscClose); // <==== такая же ссылка должна быть
        this._popupElement.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            //клик по серому фону ИЛИ по кнопке закрытия
            if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
                this.close();
            }
        })
    }
}