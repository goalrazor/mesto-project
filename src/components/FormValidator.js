export default class FormValidator {
  constructor (options, formElement) {
    this._options = options;
    this._formElement = formElement;
  } 
  disableButton (buttonElement) {
    buttonElement.classList.add(this._options.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  disableAllErrors() {
    const formFieldsList = Array.from(this._formElement.querySelectorAll(this._options.formField));
    formFieldsList.forEach((formField) => {
      const inputElement = formField.querySelector(this._options.inputSelector);
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(this._formElement);
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
    const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
    this.disableButton(buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._options.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
}










