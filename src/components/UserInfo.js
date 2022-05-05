export default class UserInfo {
    constructor(nameSelector, aboutSelector, api) {
      this.userNameElement = document.querySelector(nameSelector);
      this.userAboutElement = document.querySelector(aboutSelector);
      this._api = api;
      this.avatarUrl = '';
      this.id = '';
    }

    getUserInfo() {
        return this._api.getProfileInfoFromServer()
          .then((res) => {
            this.avatarUrl = res.avatar;
            this.id = res.id;
            return res;
          })
    }

  setUserInfo(userData) {
    //finally уехал в индекс что бы закрыть не видный отсюда попап
    return this._api.updateUserInfo(userData)
      .then((res) => {
        this.userNameElement.textContent = res.name;
        this.userAboutElement.textContent = res.about;
        return res;
      })
  }
}

