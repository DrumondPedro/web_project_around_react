import { useRef, useState } from 'react';

function NewCard({ isSaving, onAddPlaceSubmit }) {
  const titleRef = useRef();
  const linkRef = useRef();

  const [title, setTitle] = useState();
  const [link, setLink] = useState();

  const [isValid, setIsValid] = useState({ title: ' ', link: ' ' });
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    titleMsg: '',
    linkMsg: '',
  });

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
    setIsValid({ ...isValid, title: titleRef.current.validity.valid });
    setIsActive(
      titleRef.current.validity.valid && linkRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      titleMsg: titleRef.current.validationMessage,
    });
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
    setIsValid({ ...isValid, link: linkRef.current.validity.valid });
    setIsActive(
      titleRef.current.validity.valid && linkRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      linkMsg: linkRef.current.validationMessage,
    });
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
            className={`form__input form__input_title
            ${isValid.title ? `` : `form__input_type-error`}`}
            id='title'
            placeholder='Título'
            required
            minLength='2'
            maxLength='30'
            value={title}
            ref={titleRef}
            onChange={handleTitleChange}
          />
          <span
            className={`form__error about-error 
            ${isValid.title ? `` : `form__error_visible`}`}
          >
            {errorMessage.titleMsg}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_link 
            ${isValid.link ? `` : `form__input_type-error`}`}
            id='link'
            placeholder='Link de imagem'
            required
            value={link}
            ref={linkRef}
            onChange={handleLinkChange}
          />
          <span
            className={`form__error about-error 
            ${isValid.link ? `` : `form__error_visible`}`}
          >
            {errorMessage.linkMsg}
          </span>
        </label>
      </fieldset>
      <button
        type='submit'
        // disabled={isSaving}
        className={`form__submit-button 
        ${isActive ? `` : `form__submit-button-inactive`}`}
        // ${isSaving ? 'form__submit-button-inactive' : ''}
      >
        {`${isSaving ? 'Salvando...' : `Criar`}`}
      </button>
    </form>
  );
}

export default NewCard;
