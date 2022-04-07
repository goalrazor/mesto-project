(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0}function n(e){Array.from(document.querySelectorAll(e.formField)).forEach((function(t){var n=t.querySelector(e.inputSelector);r(t,n,e)}))}e.d({},{cm:()=>F,YM:()=>U,BU:()=>D,rC:()=>I});var r=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},o=document.querySelector(".page");function c(e){e.classList.add("popup_opened"),l()}function a(e){e.classList.remove("popup_opened"),s()}function i(){document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&a(e),t.target.classList.contains("popup__close-btn")&&a(e)}))}))}var u=function(e){"Escape"===e.key&&a(document.querySelector(".popup_opened"))},l=function(){o.addEventListener("mousedown",i),o.addEventListener("keydown",u)},s=function(){o.removeEventListener("mousedown",i),o.removeEventListener("keydown",u)};function d(e,t,n){e.value=t?"Сохранение...":n}var f={baseUrl:"https://nomoreparties.co/v1/plus-cohort-8",headers:{authorization:"c88eea69-7eb3-42c3-9092-d5939e2a4a28","Content-Type":"application/json"}},v=function(){for(var e=[],t=0;t<arguments.length;t++)"function"==typeof arguments[t]&&(e[arguments[t].length]=arguments[t]);return function(){return e[arguments.length].apply(this,arguments)}}((function(e,t){return fetch("".concat(f.baseUrl,"/").concat(t),{method:e,headers:f.headers}).then(m)}),(function(e,t,n){return fetch("".concat(f.baseUrl,"/").concat(t),{method:e,headers:f.headers,body:JSON.stringify(n)}).then(m)}));function m(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function p(){return v("GET","users/me")}var y=document.querySelector(".profile__edit-btn"),_=document.querySelector(".popup_edit-profile"),h=document.forms["profile-form"],S=_.querySelector(".button");var b=document.querySelector(".fullscreen-view"),q=b.querySelector(".fullscreen-view__img"),E=b.querySelector(".fullscreen-view__heading"),L=document.querySelector(".cards .cards__container");function g(e){L.prepend(e)}function k(e){var t=document.querySelector("#card").content.querySelector(".card").cloneNode(!0),n=t.querySelector(".card__img"),r=t.querySelector(".card__like-btn"),o=t.querySelector(".card__like-count");n.src=e.link,n.alt=e.name,t.querySelector(".card__heading").textContent=e.name,function(e,t,n){e.likes.forEach((function(r){t.textContent=e.likes.length,r._id===F?n.classList.add("card__like-btn_active"):n.classList.remove("card__like-btn_active")}))}(e,o,r),r.addEventListener("click",(function(t){var n;t.target.classList.contains("card__like-btn_active")?(n=e._id,v("DELETE","cards/likes/".concat(n))).then((function(e){o.textContent=e.likes.length})).then((function(){t.target.classList.remove("card__like-btn_active")})).catch((function(e){return console.error(e)})):function(e){return v("PUT","cards/likes/".concat(e))}(e._id).then((function(e){o.textContent=e.likes.length})).then((function(){t.target.classList.add("card__like-btn_active")})).catch((function(e){return console.error(e)}))}));var a=t.querySelector(".card__delete-btn");return e.owner._id===F?a.addEventListener("click",(function(t){var n,r=t.target.closest(".card");(n=e._id,v("DELETE","cards/".concat(n))).then((function(){return r.remove()})).catch((function(e){return console.error(e)}))})):a.style.display="none",t.setAttribute("tabindex",0),n.addEventListener("click",(function(){var t,n;t=e.link,n=e.name,q.src=t,q.alt=n,E.textContent=n,c(b)})),t}var C=document.querySelector(".popup_add-place"),x=document.forms["add-place-form"],A=document.querySelector(".profile__add-btn");var w=document.querySelector(".profile__avatar"),T=document.querySelector(".popup_avatar-edit"),j=T.querySelector(".button"),P=document.forms["avatar-edit-form"];function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B=document.querySelector(".profile"),U={formSelector:".form",formField:".form__field",inputSelector:".form__text",submitButtonSelector:".form__submit",inactiveButtonClass:"button_inactive",inputErrorClass:"form__text_type_error",errorClass:"form__text-error_active"},I=B.querySelector(".profile__name"),D=B.querySelector(".profile__desc"),M=B.querySelector(".profile__avatar"),F="";Promise.all([p(),v("GET","cards")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];I.textContent=o.name,D.textContent=o.about,M.style.backgroundImage="url("+o.avatar+")",F=o._id,console.log(o),c.reverse().forEach((function(e){g(k(e))})),console.log(c)})).catch((function(e){console.error("Couldn't load from server | "+e)})),y.addEventListener("click",(function(){c(_),h["profile-name"].value=I.textContent,h["profile-desc"].value=D.textContent,t(h.querySelector(".form__submit"),U)})),h.addEventListener("submit",(function(){var e,t="Сохранить";d(S,!0,t),(e={name:h["profile-name"].value,about:h["profile-desc"].value},v("PATCH","users/me",e)).then((function(e){I.textContent=e.name,D.textContent=e.about})).finally((function(){return d(S,!1,t)})).catch((function(e){return console.error(e)})),n(U),a(_)})),A.addEventListener("click",(function(){c(C)})),x.addEventListener("submit",(function(){var e,r=x.querySelector(".form__submit"),o="Создать";d(r,!0,o),(e={link:x["place-url"].value,name:x["place-name"].value},v("POST","cards",e)).then((function(e){g(k(e))})).then((function(){x["place-name"].value="",x["place-url"].value="",t(r,U),n(U),a(C)})).finally((function(){return d(r,!1,o)})).catch((function(e){return console.error(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){n.addEventListener("submit",(function(e){e.preventDefault()})),function(e,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),c=e.querySelector(n.submitButtonSelector);t(c,n),o.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?r(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,a,n),function(e,n,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(n.classList.remove(r.inactiveButtonClass),n.disabled=!1):t(n,r)}(o,c,n)}))}))}(n,e)}))}(U),p(),w.addEventListener("click",(function(){c(T)})),P.addEventListener("submit",(function(){var e,n="Сохранить";d(j,!0,n),(e={avatar:P["avatar-url"].value},v("PATCH","users/me/avatar",e)).then((function(e){w.style.backgroundImage="url("+e.avatar+")"})).then((function(){P["avatar-url"].value="",a(T),t(j,U)})).finally((function(){d(j,!1,n)})).catch((function(e){return console.error(e)}))}))})();