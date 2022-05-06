export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this.userNameElement = document.querySelector(nameSelector);
        this.userAboutElement = document.querySelector(aboutSelector);
        this.userAvatarElement = document.querySelector(avatarSelector);
    }

    setUserAvatar(avatarLink) {
        this.userAvatarElement.style.backgroundImage = `url(` + avatarLink + `)`;
    }

    setUserInfo (name, about) {
        this.userNameElement.textContent = name;
        this.userAboutElement.textContent = about;
    }

    setOnLoad (res) {
        this.setUserInfo(res.name, res.about);
        this.setUserAvatar(res.avatar)
        this.authorId = res._id;
    }

    getAuthorId() {
        return this.authorId;
    }
}


