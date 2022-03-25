import {addCard, createCard} from "./cards";
import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";

const popupAddPlace = document.querySelector('.popup_add-place');
const closeAddPlacePopupButton = popupAddPlace.querySelector('.popup__close-btn');
const addPlaceForm = document.forms['add-place-form'];
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm(evt) {
  evt.preventDefault();

  addCard(createCard(addPlaceForm['place-url'].value, addPlaceForm['place-name'].value));

  addPlaceForm['place-name'].value = '';
  addPlaceForm['place-url'].value = '';
  const submitButton = addPlaceForm.querySelector('.form__submit');
  disableButton(submitButton);
  disableAllErrors();
  closePopup(popupAddPlace);
}

export const setAddPlaceListeners = () => {
  addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace);
  });

  closeAddPlacePopupButton.addEventListener('click', function () {
    addPlaceForm['place-name'].value = '';
    addPlaceForm['place-url'].value = '';
    disableAllErrors();
    closePopup(popupAddPlace)
  });

  addPlaceForm.addEventListener('submit', handleAddPlaceForm);
}
