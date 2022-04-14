import {closePopup, openPopup} from "./modals";
import {renderSubmitBtnLoading} from "./utils";
import {disableAllErrors, disableButton} from "./validate";
import {config, options} from "./constants";
import Api from "./api";

const avatarButton = document.querySelector('.profile__avatar')
const avatarPopup = document.querySelector('.popup_avatar-edit')
const submitButton = avatarPopup.querySelector('.button');
const avatarForm = document.forms['avatar-edit-form'];

function handleAvatarForm() {
  const submitText = 'Сохранить';
  renderSubmitBtnLoading(submitButton, true, submitText);
  const api = new Api(config);
  api.updateUserAvatar(
    {
      avatar: avatarForm['avatar-url'].value
    })
    .then((data) => {
      avatarButton.style.backgroundImage = `url(` + data.avatar + `)`;
    })
    .then(() => {
      avatarForm['avatar-url'].value = '';
      closePopup(avatarPopup)
      disableButton(submitButton, options);
    })
    .finally(() => {
      renderSubmitBtnLoading(submitButton, false, submitText)
    })
    .catch(err => console.error(err))
}

export const setAvatarListeners = () => {
  avatarButton.addEventListener('click', function () {
    openPopup(avatarPopup);
    disableAllErrors(options)
  });

  avatarForm.addEventListener('submit', handleAvatarForm);
}
