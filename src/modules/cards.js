import {handleFullScreenImage} from "./fullScreenPopup.js";

const cardsContainer = document.querySelector('.cards .cards__container');

export function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

export function createCard(link, name) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardImg.src = link;
  cardImg.alt = name;
  cardElement.querySelector('.card__heading').textContent = name;

  cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active')
  });

  cardElement.querySelector('.card__delete-btn').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  cardElement.querySelector('.card__img').addEventListener('click', function (evt) {
    handleFullScreenImage(link, name);
  })

  return cardElement;
}
