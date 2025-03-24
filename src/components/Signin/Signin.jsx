import { useContext, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';
import { LoadingContext } from '../../contexts/LoadingContext';

function Signin() {
  const { handleLogin } = useContext(LoginContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [signinData, setSigninData] = useState({ email: '', password: '' });

  const [isValid, setIsValid] = useState({
    validEmail: ' ',
    validPassword: ' ',
  });
  const [errorMessage, setErrorMessage] = useState({
    emailMsg: '',
    passwordMsg: '',
  });
  const [isActive, setIsActive] = useState(false);

  const handleEmailChange = (evt) => {
    setSigninData({ ...signinData, email: evt.target.value });
    setIsValid({
      ...isValid,
      validEmail: emailRef.current.validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      emailMsg: emailRef.current.validationMessage,
    });
    setIsActive(
      emailRef.current.validity.valid && emailRef.current.validity.valid
    );
  };

  const handlePasswordChange = (evt) => {
    setSigninData({ ...signinData, password: evt.target.value });
    setIsValid({
      ...isValid,
      validPassword: passwordRef.current.validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      passwordMsg: passwordRef.current.validationMessage,
    });
    setIsActive(
      emailRef.current.validity.valid && emailRef.current.validity.valid
    );
  };

  async function handleSubimit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    await handleLogin(signinData);
    setIsLoading(false);
  }

  return (
    <section className='signin'>
      <h2 className='signin__title'>Entrar</h2>
      <form className='form signin__form' onSubmit={handleSubimit}>
        <fieldset className='form__set signin__form-set'>
          <label className='form__field signin__form-field'>
            <input
              className='form__input form__signin-input'
              type='email'
              id='email'
              placeholder='E-mail'
              value={signinData.email}
              onChange={handleEmailChange}
              ref={emailRef}
              required
            ></input>
            <span
              className={`form__error form__signin-error ${
                isValid.validEmail ? `` : `form__error_visible`
              }`}
            >
              {errorMessage.emailMsg}
            </span>
          </label>
          <label className='form__field'>
            <input
              className='form__input form__signin-input'
              type='password'
              id='password'
              placeholder='Senha'
              minLength='8'
              value={signinData.password}
              onChange={handlePasswordChange}
              ref={passwordRef}
              required
            ></input>
            <span
              className={`form__error form__signin-error ${
                isValid.validPassword ? `` : `form__error_visible`
              }`}
            >
              {errorMessage.passwordMsg}
            </span>
          </label>
        </fieldset>
        <button
          type='submit'
          disabled={isLoading || !isActive}
          className={`form__submit-button form__signin-submit-button 
            ${isActive ? `` : `form__signin-submit-button-inactive`}
            ${isLoading ? `form__signin-submit-button-inactive` : ``}
            `}
        >
          Entrar
        </button>
      </form>
      <p className='signin__text'>
        Ainda não é membro?{' '}
        <Link className='signin__link' to={'/signup'}>
          Inscreva-se aqui!
        </Link>
      </p>
    </section>
  );
}

export default Signin;
