const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

const handleCloseClick = (event) => {
  if (event.target.classList.contains('popup_is-opened'))
    return closeModal(event.target);

  if (event.target.closest('.popup__close'))
    return closeModal(event.target.closest('.popup'));
};

const openModal = (element) => {
  element.classList.add('popup_is-animated');

  requestAnimationFrame(() => {
    element.classList.add('popup_is-opened');
  });

  document.addEventListener('keydown', handleKeyDown);
  element.addEventListener('click', handleCloseClick);
};

const closeModal = (element) => {
  document.removeEventListener('keydown', handleKeyDown);
  element.removeEventListener('click', handleCloseClick);

  element.addEventListener('transitionend', () => {
    element.classList.remove('popup_is-animated');
  }, {once: true});

  element.classList.remove('popup_is-opened');
};
  
export { openModal, closeModal };