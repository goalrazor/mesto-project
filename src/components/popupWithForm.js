import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.form');
    }

    open(imgSrc, imgHeading) {
        this.imgElement.src = imgSrc;
        this.imgHeadingElement.textContent = imgHeading;
        super.open();
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            //передаем в колбэк значения полей !!!ДОПИСАТЬ ТЕЛО КОЛБЭКА В ИНДЕКСЕ
            this._handleFormSubmit(this._getInputValues());
            this._formElement.reset();
        })
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll('.form__text');
        //создаем пустой объект
        this._formValues = {};
        //засовываем туда значения всех полей, ключ - имя поля
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
}