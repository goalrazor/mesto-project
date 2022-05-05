import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        //выбираем элементы картинки и подписи в контейнере попапа
        this.imgElement = this._popupElement.querySelector('.fullscreen-view__img');
        this.imgHeadingElement = this._popupElement.querySelector('.fullscreen-view__heading');
    }

    open(imgSrc, imgHeading) {
        this.imgElement.src = imgSrc;
        this.imgElement.alt = imgHeading;
        this.imgHeadingElement.textContent = imgHeading;
        super.open();
    }
}
