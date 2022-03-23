let formSelector = '';
let formField = '';
let inputSelector = '';
let submitButtonSelector = '';
let inactiveButtonClass = '';
let inputErrorClass = '';
let errorClass = '';

export const enableValidation = (options) => {
  formSelector = options.formSelector;
  formField = options.formField;
  inputSelector = options.inputSelector;
  submitButtonSelector = options.submitButtonSelector;
  inactiveButtonClass = options.inactiveButtonClass;
  inputErrorClass = options.inputErrorClass;
  errorClass = options.errorClass;

  validate();
}

export function disableButton(buttonElement) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

export function disableAllErrors() {
  const formFieldsList = Array.from(document.querySelectorAll(formField));
  formFieldsList.forEach((formElement) => {
    const inputElement = formElement.querySelector(inputSelector);
    hideInputError(formElement, inputElement);
  })
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  disableButton(buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const validate = () => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
