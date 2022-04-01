import {closePopup, openPopup} from "./modals";
import {disableAllErrors, disableButton} from "./validate";
import {request} from "./requests";

const profileButton = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
const profileForm = document.forms['profile-form'];
const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileDescription = profileSection.querySelector('.profile__desc');
const profileAvatar = profileSection.querySelector('.profile__avatar')

export function getProfileInfoFromServer() {
  request('GET', 'users/me')
    .then(r => r.json())
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.src = data.avatar;
    })
}

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
    closePopup(popupEditProfile);
  });

  profileForm.addEventListener('submit', handleProfileForm);
}

function handleProfileForm(evt) {
  evt.preventDefault();

  request('PATCH', 'users/me',
    {
      name: profileForm['profile-name'].value,
      about: profileForm['profile-desc'].value
    });

  disableAllErrors();
  getProfileInfoFromServer();
  closePopup(popupEditProfile);
}


