import {closePopup, openPopup} from "./modals";
import {disableButton} from "./validate";

const profileButton = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
const profileForm = popupEditProfile.querySelector('form');
const editProfileFormInputs = popupEditProfile.querySelectorAll('form .form__text');
const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileDescription = profileSection.querySelector('.profile__desc');

export const setProfileListeners = () => {
  profileButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    editProfileFormInputs[0].value = profileName.textContent;
    editProfileFormInputs[1].value = profileDescription.textContent;
    const submitButton = profileForm.querySelector('.form__submit');
    disableButton(submitButton);
  });

  closeEditProfilePopupButton.addEventListener('click', function () {
    closePopup(popupEditProfile)
  });

  profileForm.addEventListener('submit', handleProfileForm);
}

function handleProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileFormInputs[0].value;
  profileDescription.textContent = editProfileFormInputs[1].value;
  closePopup(popupEditProfile);
}

