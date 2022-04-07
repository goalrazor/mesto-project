/*
Странно. Как будто к вам попал не тот коммит. Хотя я точно помню что пушил. Как будто тот проект который был у вас был
 на коммите #a3121492 'unificate close listeners' а после этого было еше 5 коммитов.
 Ну что ж - зато пока пытался понять что произошло нашел еще ошибку :)
 */
import '../pages/index.css'
import {enableValidation} from "./validate";
import {setProfileListeners} from "./profilePopup";
import {setAddPlaceListeners} from "./addPlacePopup";
import {getCards, getProfileInfoFromServer} from "./api";
import {setAvatarListeners} from "./avatarPopup";
import {addCard, createCard} from "./cards";

const profileSection = document.querySelector('.profile');
export const options = {
  formSelector: '.form',
  formField: '.form__field',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}
export const profileName = profileSection.querySelector('.profile__name');
export const profileDescription = profileSection.querySelector('.profile__desc');
export const profileAvatar = profileSection.querySelector('.profile__avatar')
export let authorId = '';

const loadContentFromServer = () => {
  Promise.all([getProfileInfoFromServer(), getCards()])
    .then(([userData, cards]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(` + userData.avatar + `)`;
      authorId = userData._id;

      console.log(userData) //for debug

      cards.reverse().forEach(card => {
        addCard(createCard(card));
      });

      console.log(cards); //for debug

    })
    .catch(err => {
      console.error("Couldn't load from server | " + err)
    })
}

loadContentFromServer();
setProfileListeners();
setAddPlaceListeners();

enableValidation(options);

getProfileInfoFromServer();
setAvatarListeners();
