import closeIcon from '../../images/viewer/viewer_close_Icon.svg';

function ImagePopup({ link, name }) {
  return (
    <div className='viewer'>
      <div className='viewer__content'>
        <button className='viewer__close-button'>
          <img
            src={closeIcon}
            alt='Ícone de um x'
            className='viewer__close-image'
          />
        </button>
        <img src={link} alt={name} className='viewer__image' />
        <p className='viewer__title'>{name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
