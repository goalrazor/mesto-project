import {handleFullScreenImage} from "./fullScreenPopup.js";
import {request} from "./requests";

const cardsContainer = document.querySelector('.cards .cards__container');

export function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

export function createCard(link, name, isAuthor, cardId) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardImg.src = link;
  cardImg.alt = name;
  cardElement.querySelector('.card__heading').textContent = name;

  cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active')
  });

  const deleteButton = cardElement.querySelector('.card__delete-btn');
  if (isAuthor) {
    deleteButton.addEventListener('click', function (evt) {
      const card = evt.target.closest('.card');
      card.remove();
      request('DELETE', `cards/${cardId}`);
    });
  } else {
    deleteButton.style.display = 'none';
  }


  cardElement.setAttribute("tabindex", 0);
  cardElement.querySelector('.card__img').addEventListener('click', function (evt) {
    handleFullScreenImage(link, name);
  })

  return cardElement;
}

export const drawCards = () => {
  request('GET', 'cards').then(r => r.json()).then((data) => {
    data.reverse().forEach(el => {
      if (el.owner._id === '962f4b8fb85fe6328b59968a') {
        addCard(createCard(el.link, el.name, true, el._id));
      } else {
        addCard(createCard(el.link, el.name, false));
      }
    });
  })
}
