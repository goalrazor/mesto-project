export default class FormValidator {
  constructor (options) {
    this.options = options;
  } 
  disableButton (buttonElement) {
    buttonElement.classList.add(this.options.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  disableAllErrors() {
    const formFieldsList = Array.from(document.querySelectorAll(this.options.formField));
    formFieldsList.forEach((formElement) => {
      const inputElement = formElement.querySelector(this.options.inputSelector);
      this._hideInputError(formElement, inputElement, this.options);
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.options.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
  
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.options.errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.options.inputErrorClass);
    errorElement.classList.remove(this.options.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.options.inputSelector));
    const buttonElement = formElement.querySelector(this.options.submitButtonSelector);
    this.disableButton(buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
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
      buttonElement.classList.remove(this.options.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
}










