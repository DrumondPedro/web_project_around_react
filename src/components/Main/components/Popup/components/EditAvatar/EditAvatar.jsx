import { useState } from 'react';

function EditAvatar({ isSaving, handleApiRequest }) {
  const [picture, setPicture] = useState('');

  function handleSubimit(evt) {
    evt.preventDefault();
    handleApiRequest(picture);
  }
  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_picture `}
            // ${isValidAvatarLink ? `` : `form__input_type-error`}`}
            id='picture'
            placeholder='Link da foto'
            required
            value={picture}
            onChange={(evt) => {
              setPicture(evt.target.value);
              // setIsValidAvatarLink(evt.target.validity.valid);
              // setAvatarLinkErrorMessage(evt.target.validationMessage);
              // setAvatarButtonState(
              //   Array.from(
              //     evt.target.parentElement.parentElement.parentElement.elements
              //   ).every((input) => input.validity.valid)
              // );
            }}
          />
          <span
            className={`form__error about-error `}
            // ${isValidAvatarLink ? `` : `form__error_visible`}`}
          >
            {/* {avatarLinkErrorMessage} */}
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
        {`${isSaving ? 'Salvando...' : 'Salvar'}`}
      </button>
    </form>
  );
}

export default EditAvatar;
