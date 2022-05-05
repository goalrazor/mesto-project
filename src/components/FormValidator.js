export default class FormValidator {
  constructor (options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._formFieldList = Array.from(this._formElement.querySelectorAll(this._options.formField));
    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
  } 
  disableButton() {
    this._buttonElement.classList.add(this._options.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  disableAllErrors() {
    this._formFieldList.forEach((formField) => {
      const inputElement = formField.querySelector(this._options.inputSelector);
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
    };
  
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _setEventListeners = () => {
    this.disableButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
}










