import {handleFullScreenImage} from "./fullScreenPopup.js";
import {addLikeOnCard, deleteCard, deleteLikeOnCard} from "./api";
import {authorId} from "./index";

const cardsContainer = document.querySelector('.cards .cards__container');

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
      deleteLikeOnCard(card._id)
        .then((card) => {
          cardLikesCountElement.textContent = card.likes.length;
        })
        .then(() => {
          evt.target.classList.remove('card__like-btn_active')
        })
        .catch(err => console.error(err));
    } else {
      addLikeOnCard(card._id)
        .then((card) => {
          cardLikesCountElement.textContent = card.likes.length;
        })
        .then(() => {
          evt.target.classList.add('card__like-btn_active')
        })
        .catch(err => console.error(err));
    }
  });

  const deleteButton = cardElement.querySelector('.card__delete-btn');
  if (card.owner._id === authorId) {
    deleteButton.addEventListener('click', function (evt) {
      const cardElement = evt.target.closest('.card');
      deleteCard(card._id)
        .then(() => cardElement.remove())
        .catch((err) => console.error(err));
    });
  } else {
    deleteButton.style.display = 'none';
  }

  cardElement.setAttribute("tabindex", 0);
  cardImg.addEventListener('click', function (evt) {
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
