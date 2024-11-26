import closeIcon from '../../../../../../assets/images/viewer/viewer_close_Icon.svg';

function ImagePopup({ card }) {
  return (
    <>
      <img src={card.link} alt={card.name} className='viewer__image' />
      <p className='viewer__title'>{card.name}</p>
    </>
  );
}

export default ImagePopup;
