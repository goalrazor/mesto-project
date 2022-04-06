import {handleFullScreenImage} from "./fullScreenPopup.js";
import {request} from "./requests";

const cardsContainer = document.querySelector('.cards .cards__container');
let authorId = ''

request('GET', 'users/me')
  .then((data) => {
    authorId = data._id;
  });

export function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

export function createCard(card) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  const likeBtn = cardElement.querySelector('.card__like-btn');
  const cardLikesCountElement = cardElement.querySelector('.card__like-count');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardElement.querySelector('.card__heading').textContent = card.name;

  updateLikes(card, cardLikesCountElement, likeBtn);

  likeBtn.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-btn_active')) {
      evt.target.classList.remove('card__like-btn_active')
      request('DELETE', `cards/likes/${card._id}`)
        .then((card) => {
          cardLikesCountElement.textContent = card.likes.length;
        });
    } else {
      evt.target.classList.add('card__like-btn_active')
      request('PUT', `cards/likes/${card._id}`)
        .then((card) => {
          cardLikesCountElement.textContent = card.likes.length;
        });
    }
  });

  const deleteButton = cardElement.querySelector('.card__delete-btn');
  if (card.owner._id === '962f4b8fb85fe6328b59968a') {
    deleteButton.addEventListener('click', function (evt) {
      const cardElement = evt.target.closest('.card');
      cardElement.remove();
      request('DELETE', `cards/${card._id}`);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  cardElement.setAttribute("tabindex", 0);
  cardElement.querySelector('.card__img').addEventListener('click', function (evt) {
    handleFullScreenImage(card.link, card.name);
  })

  return cardElement;
}

function updateLikes(card, cardLikesCountElement, likeBtn) {
  card.likes.forEach((likeAuthor) => {
    cardLikesCountElement.textContent = card.likes.length;
    if (likeAuthor._id === authorId) {
      likeBtn.classList.add('card__like-btn_active');
    } else {
      likeBtn.classList.remove('card__like-btn_active');
    }
  })
}

