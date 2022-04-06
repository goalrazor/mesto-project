const page = document.querySelector('.page');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addCloseListeners();
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteCloseListeners();
}


function handleClose() {
  const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
    })
  })
}

const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const addCloseListeners = () => {
  page.addEventListener('mousedown', handleClose);
  page.addEventListener('keydown', handleEscape);
}

const deleteCloseListeners = () => {
  page.removeEventListener('mousedown', handleClose);
  page.removeEventListener('keydown', handleEscape);
}







