import { useContext, useState } from 'react';

import CurrentUserContext from '../../../../../../contexts/CurrentUserContext';

function EditProfile({ isSaving }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    // setIsValidName(evt.target.validity.valid);
    // setNameErrorMessage(evt.target.validationMessage);
  };
  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
    // setIsValidAbout(evt.target.validity.valid);
    // setAboutErrorMessage(evt.target.validationMessage);
  };

  function handleSubimit(evt) {
    evt.preventDefault();
    handleUpdateUser({ name, about });
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
            value={name}
            onChange={handleNameChange}
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
            value={about}
            onChange={handleAboutChange}
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
