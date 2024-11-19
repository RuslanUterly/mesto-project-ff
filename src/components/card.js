const createCard = (template, data, likeCallBack, deleteCallBack, imageCallBack) => {
    const cardCopy = template.querySelector('.card').cloneNode(true);

    const cardImage = cardCopy.querySelector('.card__image');
    cardImage.addEventListener('click', () => imageCallBack(data.link, data.name));
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardCopy.querySelector('.card__title').textContent = data.name;
    cardCopy
        .querySelector('.card__delete-button')
        .addEventListener('click', deleteCallBack);

    cardCopy
        .querySelector('.card__like-button')
        .addEventListener('click', likeCallBack);
        
    return cardCopy;
};

const deleteCard = (event) => event.target.closest('.card').remove();

const likeCard = (event) => event.currentTarget.classList.toggle('card__like-button_is-active');

export { deleteCard, createCard, likeCard };