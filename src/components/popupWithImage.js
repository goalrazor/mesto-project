import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this.imgElement = this._popupElement.querySelector('.fullscreen-view__img');
        this.imgHeadingElement = this._popupElement.querySelector('.fullscreen-view__heading');
    }

    open(imgSrc, imgHeading) {
        this.imgElement.src = imgSrc;
        this.imgHeadingElement.textContent = imgHeading;
        super.open();
    }
}