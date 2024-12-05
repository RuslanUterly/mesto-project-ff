(()=>{"use strict";var e=function(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))},t=function(e){return e.target.classList.contains("popup_is-opened")?r(e.target):e.target.closest(".popup__close")?r(e.target.closest(".popup")):void 0},n=function(n){n.classList.add("popup_is-animated"),requestAnimationFrame((function(){n.classList.add("popup_is-opened")})),document.addEventListener("keydown",e),n.addEventListener("click",t)},r=function(n){document.removeEventListener("keydown",e),n.removeEventListener("click",t),n.addEventListener("transitionend",(function(){n.classList.remove("popup_is-animated")}),{once:!0}),n.classList.remove("popup_is-opened")},o={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"243fa4e9-82d2-4aea-b9b4-cac5dab0689e","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},i=function(e){return fetch(e,{method:"HEAD"}).then((function(e){var t=e.ok,n=e.headers,r=e.status;return t?n.get("Content-Type").includes("image")?Promise.resolve():Promise.reject("Ошибка: URL ссылается на не изображение"):Promise.reject("Ошибка: ".concat(r))}))},c=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{headers:o.headers,method:"PUT"}).then(a)},s=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{headers:o.headers,method:"DELETE"}).then(a)},u=function(e){var t=e.cardId,n=e.buttonElement,r=e.counterElement;n.disabled=!0,(n.classList.contains("card__like-button_is-active")?s:c)(t).then((function(e){var t=e.likes;n.classList.toggle("card__like-button_is-active"),r.textContent=t.length,r.classList.toggle("card__like-counter_is-active",t.length>0)})).catch((function(e){return console.error(e)})).finally((function(){n.disabled=!1}))},l=function(e){var t=e.currentUserId,n=e.template,r=e.data,o=e.likeCallBack,a=void 0===o?u:o,i=e.deleteCallBack,c=e.imageCallBack,s=n.querySelector(".card").cloneNode(!0),l=s.querySelector(".card__image"),d=s.querySelector(".card__like-counter"),m=s.querySelector(".card__delete-button"),p=s.querySelector(".card__like-button");return l.addEventListener("click",(function(){return c(r.link,r.name)})),l.src=r.link,l.alt=r.name,s.querySelector(".card__title").textContent=r.name,r.likes.length&&(d.classList.add("card__like-counter_is-active"),d.textContent=r.likes.length),r.owner._id===t?m.addEventListener("click",(function(){i({cardId:r._id,cardElement:s,buttonElement:m})})):m.classList.add("card__delete-button_is-unactive"),r.likes.find((function(e){return e._id===t}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){a({cardId:r._id,buttonElement:p,counterElement:d})})),s};function d(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=function(e){var t=e.formElement,n=e.inputElement,r=e.inputErrorClass,o=e.errorClass,a=t.querySelector(".".concat(n.id,"-error"));a.classList.remove(o),a.textContent="",n.classList.remove(r)},f=function(e){var t=e.inputList,n=e.submitButtonElement,r=e.inactiveButtonClass;!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(r)):(n.disabled=!0,n.classList.add(r))},v=function(e,t){var n=t.submitButtonSelector,r=t.inactiveButtonClass,o=t.inputSelector,a=t.inputErrorClass,i=t.errorClass,c=d(e.querySelectorAll(o)),s=e.querySelector(n);c.forEach((function(t){p({formElement:e,inputElement:t,inputErrorClass:a,errorClass:i}),t.setCustomValidity("")})),f({inputList:c,submitButtonElement:s,inactiveButtonClass:r})};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,b,h,E,C,S,g,L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},k=document.querySelector("#card-template").content,q=document.querySelector(".places__list"),B=document.querySelector(".popup_type_edit"),A=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__image"),I=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),j=document.forms["edit-profile"],w=j.querySelector(".popup__button"),T=j.elements.name,P=j.elements.description,O=document.forms["edit-avatar"],D=O.elements.avatar,M=O.querySelector(".popup__button"),N=document.querySelector(".popup_type_edit-avatar"),H=document.querySelector(".popup_type_new-card"),J=document.querySelector(".profile__add-button"),V=document.forms["new-place"],$=V.querySelector(".popup__button"),z=V.elements["place-name"],F=V.elements.link,R=document.querySelector(".popup_type_image"),G=document.querySelector(".popup__caption"),K=document.querySelector(".popup__image"),Q=document.querySelector(".popup_type_confirm"),W=Q.querySelector(".popup__button"),X=function(e){var t=e.name,n=e.description,r=e.avatar;I.textContent=t,x.textContent=n,U.style.backgroundImage="url(".concat(r,")")},Y=function(e){var t=e.buttonElement,n=e.isLoading;t.textContent=n?"Сохранение...":"Сохранить"},Z=function(e){var t=e.cardId,i=e.buttonElement;n(Q),W.onclick=function(){i.disabled=!0,function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{headers:o.headers,method:"DELETE"}).then(a)}(t).then((function(){i.closest(".card").remove(),r(Q)})).catch((function(e){i.disabled=!1,console.error(e)}))}},ee=function(e,t){K.src=e,K.alt=t,G.textContent=t,n(R)};b=(y=L).formSelector,h=y.inputSelector,E=y.submitButtonSelector,C=y.inactiveButtonClass,S=y.inputErrorClass,g=y.errorClass,document.querySelectorAll(b).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=e.formElement,n=e.inputSelector,r=e.inputErrorClass,o=e.submitButtonSelector,a=e.inactiveButtonClass,i=e.errorClass,c=d(t.querySelectorAll(n)),s=t.querySelector(o);f({inputList:c,submitButtonElement:s,inactiveButtonClass:a}),c.forEach((function(e){e.addEventListener("input",(function(){!function(e){var t=e.formElement,n=e.inputElement,r=e.inputErrorClass,o=e.errorClass;n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?p({formElement:t,inputElement:n,errorClass:o,inputErrorClass:r}):function(e){var t=e.inputElement,n=e.inputErrorClass,r=e.errorClass,o=e.errorMessage,a=e.formElement.querySelector(".".concat(t.id,"-error"));a.classList.add(r),a.textContent=o,t.classList.add(n)}({formElement:t,inputElement:n,errorMessage:n.validationMessage,errorClass:o,inputErrorClass:r})}({formElement:t,inputElement:e,inputErrorClass:r,errorClass:i}),f({inputList:c,submitButtonElement:s,inactiveButtonClass:a})}))}))}({formElement:e,inputSelector:h,submitButtonSelector:E,inactiveButtonClass:C,inputErrorClass:S,errorClass:g})})),A.addEventListener("click",(function(){T.value=I.textContent,P.value=x.textContent,v(j,L),n(B)})),J.addEventListener("click",(function(){V.reset(),v(V,L),n(H)})),j.addEventListener("submit",(function(e){var t,n,i;e.preventDefault(),Y({buttonElement:w,isLoading:!0}),(t={name:T.value,description:P.value},n=t.name,i=t.description,fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers,method:"PATCH",body:JSON.stringify({name:n,about:i})}).then(a)).then((function(e){var t=e.name,n=e.about,o=e.avatar;X({name:t,description:n,avatar:o}),r(B)})).catch((function(e){console.error(e)})).finally((function(){Y({buttonElement:w,isLoading:!1})}))})),V.addEventListener("submit",(function(e){var t,n,c;e.preventDefault(),Y({buttonElement:$,isLoading:!0}),(t={name:z.value,link:F.value},n=t.name,c=t.link,i(c).then((function(){return fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers,method:"POST",body:JSON.stringify({name:n,link:c})}).then(a)}))).then((function(e){q.prepend(l({currentUserId:e.owner._id,template:k,data:e,deleteCallBack:Z,imageCallBack:ee})),V.reset(),r(H)})).catch((function(e){console.error(e)})).finally((function(){Y({buttonElement:$,isLoading:!1})}))})),O.addEventListener("submit",(function(e){var t;e.preventDefault(),Y({buttonElement:w,isLoading:!0}),(t=D.value,i(t).then((function(){return fetch("".concat(o.baseUrl,"/users/me/avatar"),{headers:o.headers,method:"PATCH",body:JSON.stringify({avatar:t})}).then(a)}))).then((function(e){var t=e.name,n=e.about,o=e.avatar;X({name:t,description:n,avatar:o}),r(N)})).catch((function(e){console.error(e)})).finally((function(){Y({buttonElement:M,isLoading:!1})}))})),U.addEventListener("click",(function(){O.reset(),v(O,L),n(N)})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(a),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(a)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,c=[],s=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=o.name,i=o.about,c=o.avatar,s=o._id,u=r[1];X({name:a,description:i,avatar:c}),u.forEach((function(e){q.append(l({currentUserId:s,template:k,data:e,deleteCallBack:Z,imageCallBack:ee}))}))})).catch((function(e){console.error(e)}))})();