const createCard = ({
    currentUserId,
    template, 
    data, 
    likeCallBack, 
    deleteCallBack, 
    imageCallBack
}) => {
    const cardCopy = template.querySelector('.card').cloneNode(true);
    const cardImage = cardCopy.querySelector('.card__image');
    const counter = cardCopy.querySelector('.card__like-counter');
    const deleteButton = cardCopy.querySelector('.card__delete-button');
    const likeButton = cardCopy.querySelector('.card__like-button');

    cardImage.addEventListener('click', () => imageCallBack(data.link, data.name));
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardCopy.querySelector('.card__title').textContent = data.name;

    if (data.likes.length) {
        counter.classList.add('card__like-counter_is-active');
        counter.textContent = data.likes.length;
    }

    if (data.owner['_id'] === currentUserId) {
        deleteButton.addEventListener('click', () => {
            deleteCallBack({
                cardId: data['_id'],
                cardElement: cardCopy,
                buttonElement: deleteButton,
            });
        });
    } else {
        deleteButton.classList.add('card__delete-button_is-unactive');
    }

    if (data.likes.find((element) => element['_id'] === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        likeCallBack({
        cardId: data['_id'],
        buttonElement: likeButton,
        counterElement: counter,
        });
    });
        
    return cardCopy;
};

export { createCard };