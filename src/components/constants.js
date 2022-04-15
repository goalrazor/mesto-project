export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: 'c88eea69-7eb3-42c3-9092-d5939e2a4a28',
    'Content-Type': 'application/json'
  }
}

export const options = {
  formSelector: '.form',
  formField: '.form__field',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active',
  cardContainer: '.cards .cards__container'
}
