import './index.css';
import { openModal, closeModal } from '../components/modal.js';
import { createCard as DOMCreateCard } from '../components/card.js';
import {
  getInitialCards,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
  createCard as APICreateCard,
  deleteCard,
} from '../components/api.js';
import { clearValidation, enableValidation } from '../components/validation.js';

// Объявление переменных
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmit = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageSubmit = profileImageForm.querySelector('.popup__button');

const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');

const cardForm = document.forms['new-place'];
const cardFormSubmit = cardForm.querySelector('.popup__button');
const cardName = cardForm.elements['place-name'];
const cardLink = cardForm.elements.link;

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImagePicture = document.querySelector('.popup__image');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button');

// Функции обработчики
const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    deleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();

        closeModal(popupConfirm);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmit,
    isLoading: true,
  });

  updateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmit,
        isLoading: false,
      });
    });
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: cardFormSubmit,
    isLoading: true,
  });

  APICreateCard({
    name: cardName.value,
    link: cardLink.value,
  })
    .then((cardData) => {
      cardContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          deleteCallBack: handleCardDelete,
          imageCallBack: handleOpenImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmit,
        isLoading: false,
      });
    });
}

const handleProfileImageFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmit,
    isLoading: true,
  });

  updateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageSubmit,
        isLoading: false,
      });
    });
};

const handleOpenPopupProfileClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfile);
}

const handleOpenPopupCardClick = () => {
  cardForm.reset();

  clearValidation(cardForm, validationConfig);

  openModal(popupCard);
}

const handleOpenImageClick = (cardLink, cardName) => { 
  popupImagePicture.src = cardLink;
  popupImagePicture.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
}

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};

// Валидация
enableValidation(validationConfig);

// Обработчики событий
popupProfileOpenButton.addEventListener('click', handleOpenPopupProfileClick);
popupCardOpenButton.addEventListener('click', handleOpenPopupCardClick);

profileForm.addEventListener('submit', handleProfileFormSubmit); 
cardForm.addEventListener('submit', handleCardFormSubmit);

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);
profileImage.addEventListener('click', handleProfileImageClick);


// Вывод карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          deleteCallBack: handleCardDelete,
          imageCallBack: handleOpenImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });