import { useContext, useRef, useState } from 'react';

import CurrentUserContext from '../../../../../../contexts/CurrentUserContext';
import LoadingContext from '../../../../../../contexts/LoadingContext';

function EditProfile() {
  const isSaving = useContext(LoadingContext);
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const nameRef = useRef();
  const aboutRef = useRef();

  const [user, setUser] = useState({
    name: currentUser.name,
    about: currentUser.about,
  });

  const [isValid, setIsValid] = useState({ validName: ' ', validAbout: ' ' });
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    nameMsg: '',
    aboutMsg: '',
  });

  const handleNameChange = (evt) => {
    setUser({ ...user, name: evt.target.value });
    setIsValid({ ...isValid, validName: nameRef.current.validity.valid });
    setIsActive(
      nameRef.current.validity.valid && aboutRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      nameMsg: nameRef.current.validationMessage,
    });
  };
  const handleAboutChange = (evt) => {
    setUser({ ...user, about: evt.target.value });
    setIsValid({ ...isValid, validAbout: aboutRef.current.validity.valid });
    setIsActive(
      nameRef.current.validity.valid && aboutRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      aboutMsg: aboutRef.current.validationMessage,
    });
  };

  function handleSubimit(evt) {
    evt.preventDefault();
    handleUpdateUser(user);
  }

  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_name 
            ${isValid.validName ? `` : `form__input_type-error`}`}
            id='name'
            placeholder='Nome'
            required
            minLength='2'
            maxLength='40'
            value={user.name}
            ref={nameRef}
            onChange={handleNameChange}
          />
          <span
            className={`form__error person-error
             ${isValid.validName ? `` : `form__error_visible`}`}
          >
            {errorMessage.nameMsg}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_about
             ${isValid.validAbout ? `` : `form__input_type-error`}`}
            id='about'
            placeholder='Sobre mim'
            required
            minLength='2'
            maxLength='200'
            value={user.about}
            ref={aboutRef}
            onChange={handleAboutChange}
          />
          <span
            className={`form__error about-error 
             ${isValid.validAbout ? `` : `form__error_visible`}`}
          >
            {errorMessage.aboutMsg}
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
        {`${isSaving ? 'Salvando...' : `Salvar`}`}
      </button>
    </form>
  );
}

export default EditProfile;
