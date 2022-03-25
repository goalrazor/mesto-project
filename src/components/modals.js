const page = document.querySelector('.page');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addCloseListeners();
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteCloseListeners();
}

const escapeListener = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

const overlayListener = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (!evt.target.classList.contains('popup__container') &&
    evt.target.classList.contains('popup')) {
    closePopup(openedPopup)
  }
}

const addCloseListeners = () => {
  page.addEventListener('mousedown', overlayListener);
  page.addEventListener('keydown', escapeListener);
}

const deleteCloseListeners = () => {
  page.removeEventListener('mousedown', overlayListener);
  page.removeEventListener('keydown', escapeListener);
}







