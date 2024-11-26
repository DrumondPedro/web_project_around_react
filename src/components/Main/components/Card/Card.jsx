import { useEffect, useState } from 'react';
import deleteButton from '../../../../assets/images/gallery/gallery_card_delete_button.svg';

import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';

function Card({
  card,
  userId,
  onDelete,
  handleOpenPopup,
  onDeslikeClick,
  onLikeClick,
}) {
  const [currentCard, setCurrentCard] = useState(card);

  const imageComponent = {
    children: <ImagePopup card={currentCard} />,
  };

  useEffect(() => {
    setCurrentCard(card);
  }, [card]);

  function handleDelete() {
    if (currentCard.owner._id === userId) {
      onDelete(currentCard._id);
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  function handleCardClick() {
    handleOpenPopup(imageComponent);
  }

  function handleLikeButtonClick() {
    if (
      currentCard.likes.find((element) => {
        return element._id === userId;
      })
    ) {
      onDeslikeClick(currentCard._id, '/cards/likes', (res) => {
        setCurrentCard(res);
      });
    } else {
      onLikeClick(currentCard._id, '/cards/likes', (res) => {
        setCurrentCard(res);
      });
    }
  }

  return (
    <li className='gallery__card'>
      <img
        onClick={handleDelete}
        src={deleteButton}
        alt='Ícone de uma lixeira'
        className={`gallery__card-delete-button ${
          currentCard.owner._id === userId
            ? `gallery__card-delete-button-visible`
            : ''
        }`}
      />
      <img
        onClick={handleCardClick}
        className='gallery__card-image'
        src={currentCard.link}
        alt={currentCard.name}
      />
      <div className='gallery__card-information'>
        <p className='gallery__card-name '>{currentCard.name}</p>
        <div className='gallery__card-like-content'>
          <button
            onClick={handleLikeButtonClick}
            aria-label='Like do cartão'
            className={`gallery__card-like-button ${
              currentCard.likes.find((element) => {
                return element._id === userId;
              })
                ? 'gallery__card-like-button-active'
                : ''
            }`}
          ></button>
          <p className='gallery__card-like-counter'>
            {currentCard.likes.length ? currentCard.likes.length : '0'}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
