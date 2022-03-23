import '../pages/index.css'
import {enableValidation} from "./validate";
import {drawInitialCards} from "./initialCards";
import {setProfileListeners} from "./profilePopup";
import {setAddPlaceListeners} from "./addPlacePopup";

drawInitialCards();
setProfileListeners();
setAddPlaceListeners();

enableValidation({
  formSelector: '.form',
  formField: '.form__field',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
});
