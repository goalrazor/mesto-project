import '../pages/index.css'
import {enableValidation} from "./validate";
import {setProfileListeners} from "./profilePopup";
import {setAddPlaceListeners} from "./addPlacePopup";
import Api from "./api";
import Card from "./cards";
import {setAvatarListeners} from "./avatarPopup";
import {setCloseListeners} from "./modals";
import {config, options} from "./constants";
import {addCard} from "./utils";
import PopupWithImage from "./popupWithImage";

const profileSection = document.querySelector('.profile');

export const profileName = profileSection.querySelector('.profile__name');
export const profileDescription = profileSection.querySelector('.profile__desc');
export const profileAvatar = profileSection.querySelector('.profile__avatar')
export let authorId = '';

const api = new Api(config)
const popupWithImageElement = new PopupWithImage('.fullscreen-view');
// console.log(popupWithImageElement); //TODO for debug

const loadContentFromServer = () => {
  Promise.all([api.getProfileInfoFromServer(), api.getCards()])
    .then(([userData, cards]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(` + userData.avatar + `)`;
      authorId = userData._id;

      // console.log(userData) //TODO for debug

      cards.reverse().forEach(card => {
        addCard(options.cardContainer, new Card(card, '#card', (imgSrc, imgHeading) => {
            popupWithImageElement.open(imgSrc, imgHeading);
        }).createCard());
      });

      // console.log(cards); //TODO for debug

    })
    .catch(err => {
      console.error("Couldn't load from server | " + err)
    })
}

loadContentFromServer();
setCloseListeners()
setProfileListeners();
setAddPlaceListeners();

enableValidation(options);

setAvatarListeners();
