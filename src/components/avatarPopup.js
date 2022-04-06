import {closePopup, openPopup} from "./modals";
import {updateUserAvatar} from "./api";
import {renderSubmitBtnLoading} from "./utils";

const avatarButton = document.querySelector('.profile__avatar')
const avatarPopup = document.querySelector('.popup_avatar-edit')
const submitButton = avatarPopup.querySelector('.button');
const avatarForm = document.forms['avatar-edit-form'];

function handleAvatarForm(evt) {
  const submitText = 'Сохранить';
  renderSubmitBtnLoading(submitButton, true, submitText);
  updateUserAvatar(
    {
      avatar: avatarForm['avatar-url'].value
    })
    .then((data) => {
      avatarButton.style.backgroundImage = `url(` + data.avatar + `)`;
    })
    .then(() => {
      avatarForm['avatar-url'].value = '';
      closePopup(avatarPopup)
    })
    .finally(() => {
      renderSubmitBtnLoading(submitButton, false, submitText)
    })
    .catch(err => console.error(err))
}

export const setAvatarListeners = () => {
  avatarButton.addEventListener('click', function () {
    openPopup(avatarPopup);
  });

  avatarForm.addEventListener('submit', handleAvatarForm);
}
