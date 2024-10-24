import closeIcon from '../../images/viewer/viewer_close_Icon.svg';

function ImagePopup({ link, name }) {
  return (
    <div class='viewer'>
      <div class='viewer__content'>
        <button class='viewer__close-button'>
          <img
            src={closeIcon}
            alt='Ícone de um x'
            class='viewer__close-image'
          />
        </button>
        <img src={link} alt={name} class='viewer__image' />
        <p class='viewer__title'>{name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
