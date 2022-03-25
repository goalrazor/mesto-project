import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";

const profileButton = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
const profileForm = document.forms['profile-form'];
const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileDescription = profileSection.querySelector('.profile__desc');

export const setProfileListeners = () => {
  profileButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    profileForm['profile-name'].value = profileName.textContent;
    profileForm['profile-desc'].value = profileDescription.textContent;
    const submitButton = profileForm.querySelector('.form__submit');
    disableButton(submitButton);
  });

  closeEditProfilePopupButton.addEventListener('click', function () {
    disableAllErrors();
    closePopup(popupEditProfile)
  });

  profileForm.addEventListener('submit', handleProfileForm);
}

function handleProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileForm['profile-name'].value;
  profileDescription.textContent = profileForm['profile-desc'].value
  disableAllErrors();
  closePopup(popupEditProfile);
}

