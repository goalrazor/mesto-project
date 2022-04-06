import {addCard, createCard} from "./cards";
import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";
import {postNewCard} from "./api";
import {renderSubmitBtnLoading} from "./utils";

const popupAddPlace = document.querySelector('.popup_add-place');
const addPlaceForm = document.forms['add-place-form'];
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm(evt) {
  const submitButton = addPlaceForm.querySelector('.form__submit');
  const submitText = 'Создать';
  renderSubmitBtnLoading(submitButton, true, submitText);
  postNewCard(
    {
      link: addPlaceForm['place-url'].value,
      name: addPlaceForm['place-name'].value
    })
    .then((newCard) => {
      addCard(createCard(newCard));
    })
    .then(() => {
      addPlaceForm['place-name'].value = '';
      addPlaceForm['place-url'].value = '';
      disableButton(submitButton);
      disableAllErrors();
      closePopup(popupAddPlace);
    })
    .finally(() => renderSubmitBtnLoading(submitButton, true, submitText))
    .catch(err => console.error(err));
}

export const setAddPlaceListeners = () => {
  addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace);
  });

  addPlaceForm.addEventListener('submit', handleAddPlaceForm);
}
