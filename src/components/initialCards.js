import {addCard, createCard} from "./cards";
import {request} from "./requests";

export const drawInitialCards = () => {
  request('GET', 'cards').then(result => result.json()).then((data) => {
    data.forEach(el => {
      addCard(createCard(el.link, el.name));
    });
  })
}
