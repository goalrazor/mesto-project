import {addCard, createCard} from "./cards";
import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";
import {request} from "./requests";
import {renderSubmitBtnLoading} from "./utils";

const popupAddPlace = document.querySelector('.popup_add-place');
const closeAddPlacePopupButton = popupAddPlace.querySelector('.popup__close-btn');
const addPlaceForm = document.forms['add-place-form'];
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm(evt) {
  const submitButton = addPlaceForm.querySelector('.form__submit');
  const submitText = 'Создать';
  renderSubmitBtnLoading(submitButton, true, submitText);
  request('POST', 'cards',
    {
      link: addPlaceForm['place-url'].value,
      name: addPlaceForm['place-name'].value
    })
    .then((r) => {
      addCard(createCard(r));
    })
    .finally(() => renderSubmitBtnLoading(submitButton, true, submitText));

  addPlaceForm['place-name'].value = '';
  addPlaceForm['place-url'].value = '';
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
