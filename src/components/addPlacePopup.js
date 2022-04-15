import Card from "./cards";
import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";
import {config, options} from "./constants";
import {addCard, renderSubmitBtnLoading} from "./utils";
import Api from "./api";

const popupAddPlace = document.querySelector('.popup_add-place');
const addPlaceForm = document.forms['add-place-form'];
const addPlaceButton = document.querySelector('.profile__add-btn');

function handleAddPlaceForm() {
  const submitButton = addPlaceForm.querySelector('.form__submit');
  const submitText = 'Создать';
  renderSubmitBtnLoading(submitButton, true, submitText);
  const api = new Api(config);
  api.postNewCard(
    {
      link: addPlaceForm['place-url'].value,
      name: addPlaceForm['place-name'].value
    })
    .then((newCard) => {
      addCard(options.cardContainer, new Card(newCard, '#card').createCard());
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
    disableAllErrors(options);
  });

  addPlaceForm.addEventListener('submit', handleAddPlaceForm);
}
