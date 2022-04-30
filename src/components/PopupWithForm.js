import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this.formElement = this._popupElement.querySelector('.form');
    }

    //передаем в метод значения полей при их наличии
    open(predefinedValues) {
        //если в форме есть поля, которые нужно заполнить при открытии, вызываем функцию заполнения формы
        if (predefinedValues) {
            this._fillInputValues(predefinedValues);
        }
        super.open();
    }

    _fillInputValues(arr) {
        //принимаем массив с ключами и значениями полей объекта
        const inputNames = Object.keys(arr);
        inputNames.forEach((inputName) => {
            //проверяем есть ли инпут с таким именем в форме, если есть то заполняем его текстом
            if (this.formElement.elements[inputName]) {
                this.formElement.elements[inputName].value = arr[inputName];
            }
        })
    }

    close() {
        super.close();
        this.formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            //по нажатию кнопки сабмита меняем текст на "Сохранение..."
            this._setPendingStatus()
            //передаем в колбэк значения полей
            this._handleFormSubmit(this._getInputValues());
            this.formElement.reset();
        })
    }

    _getInputValues() {
        //выьираем инпуты
        this._inputList = this.formElement.querySelectorAll('.form__text');
        //создаем пустой объект
        this._formValues = {};
        //засовываем туда значения всех полей, ключ - имя поля
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    //функция замены текста кнопки сабмита при сохранении
    _setPendingStatus() {
        this.formElement.elements['submit-button'].value = 'Сохранение...'
    }

    //выбираем кнопку сабмита и меняем текст
    rollbackButtonText(text) {
        this.formElement.elements['submit-button'].value = text;
    }

}
