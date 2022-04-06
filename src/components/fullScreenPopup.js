import {openPopup} from "./modals";

const fullscreenViewPopup = document.querySelector('.fullscreen-view');
const popupCardPicture = fullscreenViewPopup.querySelector('.fullscreen-view__img');
const popupCardTitle = fullscreenViewPopup.querySelector('.fullscreen-view__heading');

export function handleFullScreenImage(link, name) {
  popupCardPicture.src = link;
  popupCardPicture.alt = name;
  popupCardTitle.textContent = name;
  openPopup(fullscreenViewPopup);
}
