import { useState } from 'react';
import deleteButton from '../../images/gallery/gallery_card_delete_button.svg';

function Card({
  card,
  userId,
  onDelete,
  onCardClick,
  onDeslikeClick,
  onLikeClick,
}) {
  const [currentCard, setCurrentCard] = useState(card);
  // console.log(card);
  // console.log(currentCard);

  function handleDelete() {
    if (currentCard.owner._id === userId) {
      onDelete(currentCard._id);
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  function handleCardClick() {
    onCardClick(currentCard);
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

  function handleLikeButtonClick() {
    if (
      card.likes.find((element) => {
        return element._id === userId;
      })
    ) {
      onDeslikeClick(card._id, '/cards/likes', (res) => {
        card = res;
        console.log(card);
      });
    } else {
      onLikeClick(card._id, '/cards/likes', (res) => {
        card = res;
        console.log(card);
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
