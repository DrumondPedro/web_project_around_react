import closeIcon from '../../images/editor/editor_close_Icon.svg';

function PopupWithForm({
  children,
  name,
  title,
  buttonText,
  isOpen,
  isSaving,
  isActive,
  onClose,
  handleApiRequest,
}) {
  function handleSubimit(evt) {
    evt.preventDefault();
    handleApiRequest();
  }

  return (
    <div className={`editor editor_${name} ${isOpen ? `editor_visible` : ''}`}>
      <div className='editor__content'>
        <button
          className={`editor__close-button editor__${name}-close-button`}
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt='Ícone de um x'
            className='editor__close-image'
          />
        </button>
        <h2 className='editor__title'>{title}</h2>
        <form
          onSubmit={handleSubimit}
          className={`form form_${name} editor__form`}
          noValidate
        >
          {children}
          <button
            type='submit'
            disabled={isSaving}
            className={`form__submit-button 
              ${isSaving ? 'form__submit-button-inactive' : ''} 
              ${isActive ? `` : `form__submit-button-inactive`}`}
          >
            {`${isSaving ? 'Salvando...' : `${buttonText}`}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
