import '../pages/index.css'
import FormValidator from "./FormValidator";
import Api from "./api";
import Card from "./cards";
import {config, options} from "./constants";
import PopupWithImage from "./popupWithImage";
import PopupWithForm from "./popupWithForm";
import UserInfo from "./userInfo";
import Section from "./section";

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

//создаем объект ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
const userInfo = new UserInfo('.profile__name','.profile__desc');

//создаем элемент попапа с формой редактирования ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ и передаем колбэк с АПИ
const popupUserElement = new PopupWithForm('.popup_edit-profile', (userData) => {
    userInfo.setUserInfo(userData)
        //функция возвращает цепочку промисов из userInfo, по завершению цепочки закрываем попап
        .finally(popupUserElement.close())
});
popupUserElement.setEventListeners();
//выбираем кнопку редактирования ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ и навешиваем на нее слушатель открытия попапа с формой
const profileButton = document.querySelector('.profile__edit-btn');
profileButton.addEventListener('click', () => {
    userInfo.getUserInfo()
        .then((res) => {
            const validation = new FormValidator (options, popupUserElement.formElement);
            validation.enableValidation();
            popupUserElement.open(res);
            validation.disableAllErrors();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
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
    const validation = new FormValidator (options, popupAvatarElement.formElement);
        validation.enableValidation();
        popupAvatarElement.open();
        validation.disableAllErrors();
})

//создаем элемент попапа с формой ДОБАВЛЕНИЯ КАРТОЧКИ
const popupNewCardElement = new PopupWithForm('.popup_add-place', (userData) => {
    api.postNewCard(userData)
        .then((card) => {
            //вызываем метод добавления карточки в контейнер, собираем и передаем ему карточку
            cardList.addItem(new Card(card, '#card', (imgSrc, imgHeading) => {
                popupImageElement.open(imgSrc, imgHeading);
            }).createCard())
            popupNewCardElement.close();
        })
        .catch((err) => console.log(`Ошибка ${err.status}`));
});
popupNewCardElement.setEventListeners();
//выбираем кнопку ДОБАВЛЕНИЯ КАРТОЧКИ и навешиваем на нее слушатель открытия попапа с формой добавления карточки
addPlaceButton.addEventListener('click', () => {
    const validation = new FormValidator (options, popupNewCardElement.formElement);
        validation.enableValidation();
        popupNewCardElement.open();
        validation.disableAllErrors();
})

//создаем элемент Section для заполнения контейнера с карточками
const cardList = new Section(
    //передаем колбэк с алгоритмом рендеринга карточки
    (item) => {
        const card = new Card(item, '#card', (imgSrc, imgHeading) => {
            popupImageElement.open(imgSrc, imgHeading);
        });
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
    }
, options.cardContainer);


const loadContentFromServer = () => {
    Promise.all([api.getProfileInfoFromServer(), api.getCards()])
        .then(([userData, cards]) => {
            //  console.log(userData); //TODO for debug
            //заполняем данные о пользователе
            userInfo.setUserInfo(userData);
            profileAvatar.style.backgroundImage = `url(` + userData.avatar + `)`;
            authorId = userData._id;

            //рендерим карточки
            cardList.renderItems(cards.reverse());

            // console.log(cards); //TODO for debug
        })
        .catch(err => {
            console.error("Couldn't load from server | " + err)
        })
}

loadContentFromServer();
