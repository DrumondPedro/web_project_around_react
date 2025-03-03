import { useContext, useRef, useState } from 'react';

import LoadingContext from '../../../../../../contexts/LoadingContext';

function EditAvatar({ onUpdateAvatar }) {
  const isSaving = useContext(LoadingContext);

  const picture = useRef();

  const [isValid, setIsValid] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = useState('');

  const handleValidation = () => {
    setIsValid(picture.current.validity.valid);
    setIsActive(picture.current.validity.valid);
    setAvatarLinkErrorMessage(picture.current.validationMessage);
  };

  function handleSubimit(evt) {
    evt.preventDefault();
    onUpdateAvatar(picture.current.value);
  }
  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_picture ${
              isValid ? `` : `form__input_type-error`
            }`}
            id='picture'
            placeholder='Link da foto'
            required
            ref={picture}
            onChange={handleValidation}
          />
          <span
            className={`form__error about-error ${
              isValid ? `` : `form__error_visible`
            }`}
          >
            {avatarLinkErrorMessage}
          </span>
        </label>
      </fieldset>
      <button
        type='submit'
        disabled={isSaving}
        className={`form__submit-button 
          ${isActive ? `` : `form__submit-button-inactive`}
          ${isSaving ? 'form__submit-button-inactive' : ''}`}
      >
        {`${isSaving ? 'Salvando...' : 'Salvar'}`}
      </button>
    </form>
  );
}

export default EditAvatar;
