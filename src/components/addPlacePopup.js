import {addCard, createCard} from "./cards";
import {closePopup, openPopup} from "./modals";
import {disableButton} from "./validate";
import {options} from "./index";
import {postNewCard} from "./api";
import {renderSubmitBtnLoading} from "./utils";

const popupAddPlace = document.querySelector('.popup_add-place');
const addPlaceForm = document.forms['add-place-form'];
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm() {
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
      disableButton(submitButton, options);
      closePopup(popupAddPlace);
    })
    .finally(() => renderSubmitBtnLoading(submitButton, false, submitText))
    .catch(err => console.error(err));
}

export const setAddPlaceListeners = () => {
  addPlaceButton.addEventListener('click', function () {
    openPopup(popupAddPlace);
  });

  addPlaceForm.addEventListener('submit', handleAddPlaceForm);
}
