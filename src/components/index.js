import '../pages/index.css'
import FormValidator from "./FormValidator";
import Api from "./api";
import Card from "./cards";
import {config, options} from "./constants";
import {addCard} from "./utils";
import PopupWithImage from "./popupWithImage";
import PopupWithForm from "./popupWithForm";

const profileSection = document.querySelector('.profile');

export const profileName = profileSection.querySelector('.profile__name');
export const profileDescription = profileSection.querySelector('.profile__desc');
export const profileAvatar = profileSection.querySelector('.profile__avatar')
export const addPlaceButton = document.querySelector('.profile__add-btn');
export let authorId = '';

const api = new Api(config)

//создаем элемент попапа с картинкой и навешиваем слушатели
const popupImageElement = new PopupWithImage('.fullscreen-view');
popupImageElement.setEventListeners();

//создаем элемент попапа с формой редактирования ПРОФИЛЯ и передаем колбэк с АПИ
const popupUserElement = new PopupWithForm('.popup_edit-profile', (userData) => {
    api.updateUserInfo(userData)
        .then((res) => {
            profileName.textContent = res.name;
            profileDescription.textContent = res.about;
            popupUserElement.close();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
});
popupUserElement.setEventListeners();
//выбираем кнопку редактирования ПРОФИЛЯ и навешиваем на нее слушатель открытия попапа с формой
const profileButton = document.querySelector('.profile__edit-btn');
profileButton.addEventListener('click', () => {
    popupUserElement.open();
})

//создаем элемент попапа с формой редактирования АВАТАРА и передаем колбэк с АПИ
const popupAvatarElement = new PopupWithForm('.popup_avatar-edit', (userData) => {
    api.updateUserAvatar(userData)
        .then((res) => {
            profileAvatar.style.backgroundImage = `url(` + res.avatar + `)`;
            popupAvatarElement.close();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
});
popupAvatarElement.setEventListeners();
//выбираем кнопку редактирования АВАТАРА и навешиваем на нее слушатель открытия попапа с формой
profileAvatar.addEventListener('click', () => {
    popupAvatarElement.open();
})

//создаем элемент попапа с формой ДОБАВЛЕНИЯ КАРТОЧКИ и передаем колбэк с АПИ
const popupNewCardElement = new PopupWithForm('.popup_add-place', (userData) => {
    api.postNewCard(userData)
        .then((card) => {
            addCard(options.cardContainer, new Card(card, '#card', (imgSrc, imgHeading) => {
                popupImageElement.open(imgSrc, imgHeading);
            }).createCard());
            popupNewCardElement.close();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
});
popupNewCardElement.setEventListeners();
//выбираем кнопку ДОБАВЛЕНИЯ КАРТОЧКИ и навешиваем на нее слушатель открытия попапа с формой добавления карточки
addPlaceButton.addEventListener('click', () => {
    popupNewCardElement.open();
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

      console.log(cards); //TODO for debug

    })
    .catch(err => {
      console.error("Couldn't load from server | " + err)
    })
}

loadContentFromServer();
const validaion = new FormValidator (options);
validaion.enableValidation();