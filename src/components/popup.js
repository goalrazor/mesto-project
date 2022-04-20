export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.add('popup_is-opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.remove('popup_is-opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if ((evt.target.classList.contains('popup_is-opened')) || (evt.target.classList.contains('popup__close-btn'))) {
                this.close();
            }
        })
    }
}