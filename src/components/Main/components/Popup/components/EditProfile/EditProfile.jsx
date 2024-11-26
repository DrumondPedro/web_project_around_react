import { useState } from 'react';

function EditProfile({ isSaving, user, handleApiRequest }) {
  const [profilePopupUser, setProfilePopupUser] = useState(user);

  function handleSubimit(evt) {
    evt.preventDefault();
    handleApiRequest(profilePopupUser);
  }

  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_name `}
            // ${isValidName ? `` : `form__input_type-error`}`}
            id='name'
            placeholder='Nome'
            required
            minLength='2'
            maxLength='40'
            value={profilePopupUser.name}
            onChange={(evt) => {
              setProfilePopupUser({
                ...profilePopupUser,
                name: evt.target.value,
              });
              // setIsValidName(evt.target.validity.valid);
              // setNameErrorMessage(evt.target.validationMessage);
            }}
          />
          <span
            className={`form__error person-error`}
            // ${   isValidName ? `` : `form__error_visible`}`}
          >
            {/* {nameErrorMessage} */}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_about`}
            //  ${isValidAbout ? `` : `form__input_type-error`}`}
            id='about'
            placeholder='Sobre mim'
            required
            minLength='2'
            maxLength='200'
            value={profilePopupUser.about}
            onChange={(evt) => {
              setProfilePopupUser({
                ...profilePopupUser,
                about: evt.target.value,
              });
              // setIsValidAbout(evt.target.validity.valid);
              // setAboutErrorMessage(evt.target.validationMessage);
            }}
          />
          <span
            className={`form__error about-error `}
            // ${isValidAbout ? `` : `form__error_visible`}`}
          >
            {/* {aboutErrorMessage} */}
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
        {`${isSaving ? 'Salvando...' : `Salvar`}`}
      </button>
    </form>
  );
}

export default EditProfile;
