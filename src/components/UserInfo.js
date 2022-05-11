export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this.userNameElement = document.querySelector(nameSelector);
        this.userAboutElement = document.querySelector(aboutSelector);
        this.userAvatarElement = document.querySelector(avatarSelector);
    }

    setUserAvatar(avatarLink) {
        this.userAvatarElement.style.backgroundImage = `url(` + avatarLink + `)`;
    }

    //заполняем поля объекта данными
    _stashUserInfo(name, about) {
        this._name = name;
        this._about = about;
    }

    setUserInfo (name, about) {
        //обновляем измененные поля объекта
        this._stashUserInfo(name, about)
        this.userNameElement.textContent = this._name;
        this.userAboutElement.textContent = this._about;
    }

    //обработка при загрузке страницы
    setOnLoad (res) {
        this._authorId = res._id;
        this._stashUserInfo(res.name, res.about);
        this.setUserInfo(this._name, this._about);
        this.setUserAvatar(res.avatar)
    }

    getAuthorId() {
        return this._authorId;
    }

    getUserInfo() {
        return {name: this._name, about: this._about};
    }
}


