import './index.css';
import { initialCards } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';

// Объявление переменных
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileNameImput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');

const cardForm = document.forms['new-place'];
const cardName = cardForm.elements['place-name'];
const cardLink = cardForm.elements.link;

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImagePicture = document.querySelector('.popup__image');

// Функции обработчики
const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  profileName.textContent = profileNameImput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(popupProfile);
}

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  cardContainer.prepend(
    createCard(
      cardTemplate, 
      {
        name: cardName.value,
        link: cardLink.value,
      },
      likeCard,
      deleteCard,
      handleOpenImageClick
  ));

  cardForm.reset();

  closeModal(popupCard);
}

const handleOpenPopupProfileClick = () => {
  profileNameImput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(popupProfile);
}

const handleOpenPopupCardClick = () => {
  cardForm.reset();

  openModal(popupCard);
}

const handleOpenImageClick = (cardLink, cardName) => { 
  popupImagePicture.src = cardLink;
  popupImagePicture.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
}

// Обработчики событий
popupProfileOpenButton.addEventListener('click', handleOpenPopupProfileClick);
popupCardOpenButton.addEventListener('click', handleOpenPopupCardClick);

profileForm.addEventListener('submit', handleProfileFormSubmit); 
cardForm.addEventListener('submit', handleCardFormSubmit);

// Вывод карточек
initialCards.forEach(data => cardContainer.append(createCard(cardTemplate, data, likeCard, deleteCard, handleOpenImageClick)));