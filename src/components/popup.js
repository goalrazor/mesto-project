export default class Popup {
    constructor(selector) {
        //выбираем существующий попап в разметке ???УТОЧНИТЬ НУЖНО ЛИ ЕГО СОЗДАВАТЬ
        this._popupElement = document.querySelector(selector);
    }

    open() {
        //тут наставник разрешил использовать document для _handleEscClose
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.classList.add('popup_opened');
    }

    close() {
        //тут наставник разрешил использовать document для _handleEscClose
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.classList.remove('popup_opened');
    }

    /*open() {
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popupElement.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popupElement.classList.remove('popup_opened');
    }*/

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