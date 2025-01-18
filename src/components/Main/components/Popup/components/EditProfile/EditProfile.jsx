import { useContext, useRef, useState } from 'react';

import CurrentUserContext from '../../../../../../contexts/CurrentUserContext';

function EditProfile({ isSaving }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const nameRef = useRef();
  const aboutRef = useRef();

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const [isValid, setIsValid] = useState({ name: ' ', about: ' ' });
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    nameMsg: '',
    aboutMsg: '',
  });

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsValid({ ...isValid, name: nameRef.current.validity.valid });
    setIsActive(
      nameRef.current.validity.valid && aboutRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      nameMsg: nameRef.current.validationMessage,
    });
  };
  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
    setIsValid({ ...isValid, about: aboutRef.current.validity.valid });
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
    handleUpdateUser({ name, about });
  }

  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_name 
            ${isValid.name ? `` : `form__input_type-error`}`}
            id='name'
            placeholder='Nome'
            required
            minLength='2'
            maxLength='40'
            value={name}
            ref={nameRef}
            onChange={handleNameChange}
          />
          <span
            className={`form__error person-error
             ${isValid.name ? `` : `form__error_visible`}`}
          >
            {errorMessage.nameMsg}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_about
             ${isValid.about ? `` : `form__input_type-error`}`}
            id='about'
            placeholder='Sobre mim'
            required
            minLength='2'
            maxLength='200'
            value={about}
            ref={aboutRef}
            onChange={handleAboutChange}
          />
          <span
            className={`form__error about-error 
             ${isValid.about ? `` : `form__error_visible`}`}
          >
            {errorMessage.aboutMsg}
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
        {`${isSaving ? 'Salvando...' : `Salvar`}`}
      </button>
    </form>
  );
}

export default EditProfile;
