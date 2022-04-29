import {config} from "../utils/constants";
import Api from "./Api";

export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this.userNameElement = document.querySelector(nameSelector);
        this.userAboutElement = document.querySelector(aboutSelector);
        this._api = new Api(config);
    }

    getUserInfo() {
        return this._api.getProfileInfoFromServer()
    }

    setUserInfo (userData) {
        //finally уехал в индекс что бы закрыть не видный отсюда попап
        return this._api.updateUserInfo(userData)
            .then((res) => {
                this.userNameElement.textContent = res.name;
                this.userAboutElement.textContent = res.about;
            })
            .catch((err) => console.log(`Ошибка ${err.status}`));
    }
}

