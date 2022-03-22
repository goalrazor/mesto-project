import {disableAllErrors} from "./validate";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  disableAllErrors();
  popup.classList.remove('popup_opened');
}










