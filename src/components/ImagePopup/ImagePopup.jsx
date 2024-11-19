import closeIcon from '../../assets/images/viewer/viewer_close_Icon.svg';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`viewer ${isOpen ? `viewer_visible` : ''}`}>
      <div className='viewer__content'>
        <button className='viewer__close-button' onClick={onClose}>
          <img
            src={closeIcon}
            alt='Ícone de um x'
            className='viewer__close-image'
          />
        </button>
        <img src={card.link} alt={card.name} className='viewer__image' />
        <p className='viewer__title'>{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
