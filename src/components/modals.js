import {disableAllErrors} from "./validate";

const page = document.querySelector('.page');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addCloseListeners();
}

export function closePopup(popup) {
  disableAllErrors();
  popup.classList.remove('popup_opened');
  deleteCloseListeners();
}

const escapeListener = (evt) => {
  const popupList = page.querySelectorAll('.popup');
  popupList.forEach((popup) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}

const overlayListener = (evt) => {
  const popupList = page.querySelectorAll('.popup');
  popupList.forEach((popup) => {
    if (!evt.target.classList.contains('popup__container') &&
      evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
}

const addCloseListeners = () => {
  page.addEventListener('click', overlayListener);
  page.addEventListener('keydown', escapeListener);
}

const deleteCloseListeners = () => {
  page.removeEventListener('click', overlayListener);
  page.removeEventListener('keydown', escapeListener);
}







