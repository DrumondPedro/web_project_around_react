import { useContext, useEffect, useState } from 'react';

import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import ConfirmDeletion from '../Popup/components/ConfirmDeletion/ConfirmDeletion';

import { PopupContext } from '../../../../contexts/PopupContext';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

import deleteButton from '../../../../assets/images/gallery/gallery_card_delete_button.svg';

function Card({ card, onCardDelete, onDeslikeClick, onLikeClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleOpenPopup } = useContext(PopupContext);

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
    if (currentCard.owner._id === currentUser._id) {
      onCardDelete(currentCard._id);
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  function handleDeleteButtonClick() {
    handleOpenPopup(ConfirmDeletionPopup);
  }

  function handleCardClick() {
    handleOpenPopup(imagePopup);
  }

  function handleLikeButtonClick() {
    if (
      currentCard.likes.find((element) => {
        return element._id === currentUser._id;
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
          currentCard.owner._id === currentUser._id
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
                return element._id === currentUser._id;
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
