import deleteButton from '../../images/gallery/gallery_card_delete_button.svg';

function Card({ card, userId, onDelete }) {
  function handleDelete() {
    if (card.owner._id === userId) {
      onDelete(card._id);
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  return (
    <li className='gallery__card'>
      <img
        onClick={handleDelete}
        src={deleteButton}
        alt='Ícone de uma lixeira'
        className={`gallery__card-delete-button ${
          card.owner._id === userId ? `gallery__card-delete-button-visible` : ''
        }`}
      />
      <img className='gallery__card-image' src={card.link} alt={card.name} />
      <div className='gallery__card-information'>
        <p className='gallery__card-name '>{card.name}</p>
        <div className='gallery__card-like-content'>
          <button
            className={`gallery__card-like-button ${
              card.likes.length ? 'gallery__card-like-button-active' : ''
            }`}
          ></button>
          <p className='gallery__card-like-counter'>
            {card.likes.length ? card.likes.length : '0'}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
