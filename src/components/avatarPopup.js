import {closePopup, openPopup} from "./modals";
import {disableAllErrors} from "./validate";
import {request} from "./requests";
import {renderSubmitBtnLoading} from "./utils";

const avatarButton = document.querySelector('.profile__avatar')
const avatarPopup = document.querySelector('.popup_avatar-edit')
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close-btn')
const submitButton = avatarPopup.querySelector('.button');
const avatarForm = document.forms['avatar-edit-form'];

function handleAvatarForm(evt) {
  const submitText = 'Сохранить';
  renderSubmitBtnLoading(submitButton, true, submitText);
  request('PATCH', 'users/me/avatar',
    {
      avatar: avatarForm['avatar-url'].value
    })
    .then((data) => {
      avatarButton.style.backgroundImage = `url(` + data.avatar + `)`;
    })
    .finally(() => {
      renderSubmitBtnLoading(submitButton, false, submitText)
    })
  avatarForm['avatar-url'].value = '';
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
