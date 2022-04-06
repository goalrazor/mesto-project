import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";
import {renderSubmitBtnLoading} from "./utils";
import {options, profileDescription, profileName} from "./index";
import {updateUserInfo} from "./api";

const profileButton = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileForm = document.forms['profile-form'];
const profileSubmit = popupEditProfile.querySelector('.button')

export const setProfileListeners = () => {
  profileButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    profileForm['profile-name'].value = profileName.textContent;
    profileForm['profile-desc'].value = profileDescription.textContent;
    const submitButton = profileForm.querySelector('.form__submit');
    disableButton(submitButton, options);
  });

  profileForm.addEventListener('submit', handleProfileForm);
}

function handleProfileForm() {
  const submitText = 'Сохранить';
  renderSubmitBtnLoading(profileSubmit, true, submitText);
  updateUserInfo(
    {
      name: profileForm['profile-name'].value,
      about: profileForm['profile-desc'].value
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .finally(() => renderSubmitBtnLoading(profileSubmit, false, submitText))
    .catch(err => console.error(err));

  disableAllErrors(options);
  closePopup(popupEditProfile);
}
