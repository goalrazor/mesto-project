import {addCard, createCard} from "./cards";
import {request} from "./requests";

export const drawInitialCards = () => {
  request('GET', 'cards').then(r => r.json()).then((data) => {
    data.forEach(el => {
      addCard(createCard(el.link, el.name));
    });
  })
}
