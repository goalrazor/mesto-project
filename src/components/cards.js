import {authorId} from "./index";
import {config} from "./constants";
import Api from "./api";

export default class Card {
  constructor(data, cardTempSelector, handleFullScreen) {
    this._card = data;
    this._cardLink = data.link;
    this._cardName = data.name;
    this._cardId = data._id;
    this._author = data.owner._id
    this._cardTempSelector = cardTempSelector;
    this._api = new Api(config);
    this._handleFullScreen = handleFullScreen;
  }

  _createTemplateElements() {
    const cardTemplate = document.querySelector(this._cardTempSelector).content;
    this._cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    this._cardImg = this._cardElement.querySelector('.card__img');
    this._likeBtn = this._cardElement.querySelector('.card__like-btn');
    this._cardLikesCountElement = this._cardElement.querySelector('.card__like-count');
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
  }

  _updateLikes() {
    this._card.likes.forEach((likeAuthor) => {
      this._cardLikesCountElement.textContent = this._card.likes.length;
      if (likeAuthor._id === authorId) {
        this._likeBtn.classList.add('card__like-btn_active');
      } else {
        this._likeBtn.classList.remove('card__like-btn_active');
      }
    })
  }

  _addLikesListener() {
    this._likeBtn.addEventListener('click', this._handleLikes);
  }

  _handleLikes(evt) {
    if (evt.target.classList.contains('card__like-btn_active')) {
      this._api.deleteLikeOnCard(this._cardId)
        .then((cardResponse) => {
          this._cardLikesCountElement.textContent = cardResponse.likes.length;
        })
        .then(() => {
          evt.target.classList.remove('card__like-btn_active')
        })
        .catch(err => console.error(err));
    } else {
      this._api.addLikeOnCard(this._cardId)
        .then((cardResponse) => {
          this._cardLikesCountElement.textContent = cardResponse.likes.length;
        })
        .then(() => {
          evt.target.classList.add('card__like-btn_active')
        })
        .catch(err => console.error(err));
    }
  }

  _handleDeleteButton() {
    if (this._author === authorId) {
      this._deleteButton.addEventListener('click', (evt) => {
        const cardElement = evt.target.closest('.card');
        this._api.deleteCard(this._cardId)
          .then(() => cardElement.remove())
          .catch((err) => console.error(err));
      });
    } else {
      this._deleteButton.style.display = 'none';
    }
  }

  createCard() {
    this._createTemplateElements();
    this._cardImg.src = this._cardLink;
    this._cardImg.alt = this._cardName;
    this._cardElement.querySelector('.card__heading').textContent = this._cardName;

    this._updateLikes();

    this._addLikesListener();

    this._handleDeleteButton();

    this._cardElement.setAttribute("tabindex", 0);

    this._cardImg.addEventListener('click', function () {
      this._handleFullScreen(this._cardLink, this._cardName);
    })

    return this._cardElement;
  }
}

