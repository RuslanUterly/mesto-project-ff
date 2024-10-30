// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (data, deleteCallBack) => {
    const cardCopy = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardCopy.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardCopy.querySelector('.card__title').textContent = data.name;
    cardCopy
        .querySelector('.card__delete-button')
        .addEventListener('click', deleteCallBack);
        
    return cardCopy;
};

// @todo: Функция удаления карточки
const deleteCard = (event) => event.target.closest('.card').remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(data => cardContainer.append(createCard(data, deleteCard)));