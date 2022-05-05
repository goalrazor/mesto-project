import './index.css'
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";
import Card from "../components/Cards";
import {config, options} from "../utils/constants";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";

const profileSection = document.querySelector('.profile');

export const profileAvatar = profileSection.querySelector('.profile__avatar')
export const addPlaceButton = document.querySelector('.profile__add-btn');
export let authorId = '';

const api = new Api(config)


//создаем элемент попапа с картинкой и навешиваем слушатели
const popupImageElement = new PopupWithImage('.fullscreen-view');
popupImageElement.setEventListeners();

//создаем объект ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
const userInfo = new UserInfo('.profile__name', '.profile__desc', api);

function setUserAvatar(userData) {
  return api.updateUserAvatar(userData)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(` + res.avatar + `)`;
    })
}

//создаем элемент попапа с формой редактирования ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ и передаем колбэк с АПИ
const popupUserElement = new PopupWithForm('.popup_edit-profile', (userData) => {
  userInfo.setUserInfo(userData)
    .then(() => {
      setUserAvatar(userData);
      popupUserElement.close()
    })
    //функция возвращает цепочку промисов из userInfo, по завершению цепочки закрываем попап
    .finally(() => {
      //перед закрытием попапа убираем текст "Сохранение..." с кнопки
      popupUserElement.rollbackButtonText('Сохранить')
    })
});
popupUserElement.setEventListeners();
//выбираем кнопку редактирования ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ и навешиваем на нее слушатель открытия попапа с формой
const profileButton = document.querySelector('.profile__edit-btn');
profileButton.addEventListener('click', () => {
  userInfo.getUserInfo()
    .then((res) => {
      popupUserElement.open(res);
      formValidators[popupUserElement.formElement.getAttribute('name')].disableAllErrors();
    })
    .catch((err) => console.log(`Ошибка ${err.status}`));
})

//создаем элемент попапа с формой редактирования АВАТАРА и передаем колбэк с АПИ
const popupAvatarElement = new PopupWithForm('.popup_avatar-edit', (userData) => {
  setUserAvatar(userData)
    .then(() => popupAvatarElement.close())
    .catch((err) => console.log(`Ошибка ${err.status}`))
    .finally(() => {
      //убираем текст "Сохранение..." с кнопки
      popupAvatarElement.rollbackButtonText('Сохранить')
    });
});
popupAvatarElement.setEventListeners();
//выбираем кнопку редактирования АВАТАРА и навешиваем на нее слушатель открытия попапа с формой
profileAvatar.addEventListener('click', () => {
  popupAvatarElement.open();
  formValidators[popupAvatarElement.formElement.getAttribute('name')].disableAllErrors();
})

//создаем элемент попапа с формой ДОБАВЛЕНИЯ КАРТОЧКИ
const popupNewCardElement = new PopupWithForm('.popup_add-place', (userData) => {
  api.postNewCard(userData)
    .then((card) => {
      //вызываем метод добавления карточки в контейнер, передаем ему данные карточки
      // !!сборка карточки переехала в renderer
      cardList.addItem(card);
      popupNewCardElement.close();
    })
    .catch((err) => console.log(`Ошибка ${err.status}`))
    .finally(() => {
      //убираем текст "Сохранение..." с кнопки
      popupNewCardElement.rollbackButtonText('Создать')
    });
});
popupNewCardElement.setEventListeners();
//выбираем кнопку ДОБАВЛЕНИЯ КАРТОЧКИ и навешиваем на нее слушатель открытия попапа с формой добавления карточки
addPlaceButton.addEventListener('click', () => {
  popupNewCardElement.open();
  formValidators[popupNewCardElement.formElement.getAttribute('name')].disableAllErrors();
})

//создаем элемент Section для заполнения контейнера с карточками
const cardList = new Section(
  /* Можно было бы сделать функцию renderer обычной функцией создания карточки (без вставки ее в DOM),
  тогда в методе addItem можно было бы сразу создавать карточку и тут же вставлять ее в DOM.
  Тогда в index.js не нужно было бы отдельно создавать функцию createCard, чтобы в 2х местах создавать карточки.*/
  (item) => {
    return new Card(item, '#card', (imgSrc, imgHeading) => {
      popupImageElement.open(imgSrc, imgHeading);
    }, api, authorId).createCard();
  },
  options.cardContainer);


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

const formValidators = {}

// Включение валидации
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);
