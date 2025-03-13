import { useEffect, useState } from 'react';
import deleteButton from '../../../../assets/images/gallery/gallery_card_delete_button.svg';

import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import ConfirmDeletion from '../Popup/components/ConfirmDeletion/ConfirmDeletion';
function Card({
  card,
  userId,
  onCardDelete,
  onOpenPopup,
  onDeslikeClick,
  onLikeClick,
}) {
  const [currentCard, setCurrentCard] = useState(card);

  const imagePopup = {
    children: <ImagePopup currentCard={currentCard} />,
  };

  const ConfirmDeletionPopup = {
    title: 'Tem certeza?',
    children: <ConfirmDeletion onConfirm={handleDelete} />,
  };

  useEffect(() => {
    setCurrentCard(card);
  }, [card]);

  function handleDelete() {
    if (currentCard.owner._id === userId) {
      onCardDelete(currentCard._id);
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  function handleDeleteButtonClick() {
    onOpenPopup(ConfirmDeletionPopup);
  }

  function handleCardClick() {
    onOpenPopup(imagePopup);
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
        onClick={handleDeleteButtonClick}
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
