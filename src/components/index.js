import '../pages/index.css'
import {enableValidation} from "./validate";
//import {setProfileListeners} from "./profilePopup";
//import {setAddPlaceListeners} from "./addPlacePopup";
import Api from "./api";
import Card from "./cards";
//import {setAvatarListeners} from "./avatarPopup";
//import {setCloseListeners} from "./modals";
import {config, options} from "./constants";
import {addCard} from "./utils";
import PopupWithImage from "./popupWithImage";
import PopupWithForm from "./popupWithForm";

const profileSection = document.querySelector('.profile');

export const profileName = profileSection.querySelector('.profile__name');
export const profileDescription = profileSection.querySelector('.profile__desc');
export const profileAvatar = profileSection.querySelector('.profile__avatar')
export let authorId = '';

const api = new Api(config)

//создаем элемент попапа с картинкой и навешиваем слушатели
const popupImageElement = new PopupWithImage('.fullscreen-view');
popupImageElement.setEventListeners();

//создаем элемент попапа с формой редактирования профиля и навешиваем слушатели
const popupUserElement = new PopupWithForm('.popup_edit-profile', (userData) => {
    console.log(userData); //TODO for debug
    api.updateUserInfo(userData)
        .then((res) => {
            profileName.textContent = res.name;
            profileDescription.textContent = res.about;
            popupUserElement.close();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
});
popupUserElement.setEventListeners();

//выбираем кнопку редактирования профиля и навешиваем на нее слушатель открытия попапа с формой
const profileButton = document.querySelector('.profile__edit-btn');
profileButton.addEventListener('click', () => {
    popupUserElement.open();
})

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
            popupImageElement.open(imgSrc, imgHeading);
        }).createCard());
      });

      // console.log(cards); //TODO for debug

    })
    .catch(err => {
      console.error("Couldn't load from server | " + err)
    })
}

loadContentFromServer();
//setCloseListeners()
//setProfileListeners();
//setAddPlaceListeners();

enableValidation(options);

//setAvatarListeners();
