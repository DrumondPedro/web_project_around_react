import { useState } from 'react';

function NewCard({ isSaving, onAddPlaceSubmit }) {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
    // setIsValidTitle(evt.target.validity.valid);
    // setTitleErrorMessage(evt.target.validationMessage);
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
    // setIsValidLink(evt.target.validity.valid);
    // setLinkErrorMessage(evt.target.validationMessage);
  };

  function handleSubimit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({ title, link });
  }

  return (
    <form onSubmit={handleSubimit} className={`form  editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_title`}
            // ${isValidTitle ? `` : `form__input_type-error`}`}
            id='title'
            placeholder='Título'
            required
            minLength='2'
            maxLength='30'
            value={title}
            onChange={handleTitleChange}
          />
          <span
            className={`form__error about-error `}
            // ${isValidTitle ? `` : `form__error_visible`}`}
          >
            {/* {titleErrorMessage} */}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_link `}
            // ${isValidLink ? `` : `form__input_type-error`}`}
            id='link'
            placeholder='Link de imagem'
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span
            className={`form__error about-error `}
            // ${isValidLink ? `` : `form__error_visible`}`}
          >
            {/* {linkErrorMessage} */}
          </span>
        </label>
      </fieldset>
      <button
        type='submit'
        // disabled={isSaving}
        className={`form__submit-button `}
        // ${isSaving ? 'form__submit-button-inactive' : ''}
        // ${isActive ? `` : `form__submit-button-inactive`}`}
      >
        {`${isSaving ? 'Salvando...' : `Criar`}`}
      </button>
    </form>
  );
}

export default NewCard;
