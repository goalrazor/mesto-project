const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__text-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text_type_error');
  errorElement.classList.remove('form__text-error_active');
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
  const inputList = Array.from(formElement.querySelectorAll('.form__text'));
  const buttonElement = formElement.querySelector('.form__submit');
  buttonElement.classList.add('button_inactive');
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
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
    buttonElement.classList.add('button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.disabled = false;
  }
}

export function disableAllErrors() {
  const formFieldsList = Array.from(document.querySelectorAll('.form__field'));
  formFieldsList.forEach((formElement) => {
    const inputElement = formElement.querySelector('.form__text');
    hideInputError(formElement, inputElement);
  })
}
