import { useContext } from 'react';

import closeIcon from '../../../../assets/images/editor/editor_close_Icon.svg';

import { PopupContext } from '../../../../contexts/PopupContext';

function Popup({ children, title }) {
  const { handleClosePopup } = useContext(PopupContext);

  return (
    <div className={`editor ${!title ? 'viewer' : ''}`}>
      <div className={`editor__content ${!title ? 'viewer__content' : ''}`}>
        <button
          className={`editor__close-button ${
            !title ? 'viewer__close-button ' : ''
          }`}
          onClick={handleClosePopup}
        >
          <img
            src={closeIcon}
            alt='Ícone de um x'
            className='editor__close-image'
          />
        </button>
        {title && <h2 className='editor__title'>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
