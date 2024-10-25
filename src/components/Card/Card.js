import deleteButton from '../../images/gallery/gallery_card_delete_button.svg';

function Card({ link, name, counter }) {
  return (
    <li className='gallery__card'>
      <img
        src={deleteButton}
        alt='Ícone de uma lixeira'
        className='gallery__card-delete-button'
      />
      <img className='gallery__card-image' src={link} alt={name} />
      <div className='gallery__card-information'>
        <p className='gallery__card-name '>{name}</p>
        <div className='gallery__card-like-content'>
          <button
            className={`gallery__card-like-button ${
              counter ? 'gallery__card-like-button-active' : ''
            }`}
          ></button>
          <p className='gallery__card-like-counter'>
            {counter ? counter : '0'}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
