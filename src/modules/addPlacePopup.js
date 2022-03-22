import {addCard, createCard} from "./cards";
import {closePopup, openPopup} from "./modals";

const popupAddPlace = document.querySelector('.popup_add-place');
const closeAddPlacePopupButton = popupAddPlace.querySelector('.popup__close-btn');
const addPlaceForm = popupAddPlace.querySelector('form');
const addPlaceFormInputs = popupAddPlace.querySelectorAll('form .form__text');
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm(evt) {
  evt.preventDefault();

  addCard(createCard(addPlaceFormInputs[1].value, addPlaceFormInputs[0].value));

  addPlaceFormInputs[1].value = '';
  addPlaceFormInputs[0].value = '';

  closePopup(popupAddPlace);
}

export const setAddPlaceListeners = () => {
  addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace)
  });

  closeAddPlacePopupButton.addEventListener('click', function () {
    addPlaceFormInputs[1].value = '';
    addPlaceFormInputs[0].value = '';
    closePopup(popupAddPlace)
  });

  addPlaceForm.addEventListener('submit', handleAddPlaceForm);
}
