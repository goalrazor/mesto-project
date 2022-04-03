import {closePopup, openPopup} from "./modals";
import {disableAllErrors} from "./validate";

const avatarButton = document.querySelector('.profile__avatar')
const avatarPopup = document.querySelector('.popup_avatar-edit')
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close-btn')
const avatarForm = document.forms['avatar-edit-form'];

function handleAvatarForm(evt) {
  evt.preventDefault();
  closePopup(avatarPopup)
}

export const setAvatarListeners = () => {
  avatarButton.addEventListener('click', function () {
    openPopup(avatarPopup);
  });

  closeAvatarPopupButton.addEventListener('click', function () {
    avatarForm['avatar-url'].value = '';
    disableAllErrors();
    closePopup(avatarPopup)
  });

  avatarForm.addEventListener('submit', handleAvatarForm);
}
