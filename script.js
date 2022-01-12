const profileButton = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
const profileForm = popupEditProfile.querySelector('form');
const editProfileFormInputs = popupEditProfile.querySelectorAll('form .form__text');
const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileDescription = profileSection.querySelector('.profile__desc');
const cardsConatiner = document.querySelector('.cards .cards__container');
const addPlaceButton = document.querySelector('.profile__add-btn');
const popupAddPlace = document.querySelector('.popup_add-place');
const closeAddPlacePopupButton = popupAddPlace.querySelector('.popup__close-btn');
const addPlaceForm = popupAddPlace.querySelector('form');
const addPlaceFormInputs = popupAddPlace.querySelectorAll('form .form__text');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(link, name) {
  const addPlaceFormInputs = popupAddPlace.querySelectorAll('form .form__text');
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__img').src = link;
  cardElement.querySelector('.card__img').alt = name;
  cardElement.querySelector('.card__heading').textContent = name;

  cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active')
  });

  cardElement.querySelector('.card__delete-btn').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  cardsConatiner.prepend(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link, initialCards[i].name);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileButton.addEventListener('click', function () {
  openPopup(popupEditProfile)
  editProfileFormInputs[0].value = profileName.textContent;
  editProfileFormInputs[1].value = profileDescription.textContent;
});

closeEditProfilePopupButton.addEventListener('click', function () {
  closePopup(popupEditProfile)
});

addPlaceButton.addEventListener('click', function () {
  openPopup(popupAddPlace)
});

closeAddPlacePopupButton.addEventListener('click', function () {
  closePopup(popupAddPlace)
});

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileFormInputs[0].value;
  profileDescription.textContent = editProfileFormInputs[1].value;

  closePopup(popupEditProfile);
}

profileForm.addEventListener('submit', profileFormSubmitHandler);

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(addPlaceFormInputs[1].value, addPlaceFormInputs[0].value);

  addPlaceFormInputs[1].value = '';
  addPlaceFormInputs[0].value = '';

  closePopup(popupAddPlace);
}

addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);


// debugger;

// (cardsConatiner.querySelector('.card__delete-btn').closest('.card').remove());

