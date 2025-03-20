import { useState } from 'react';

function Signin() {
  return (
    <section className='signin'>
      <h2 className='signin__title'>Entrar</h2>
      <form className='form signin__form'>
        <fieldset className='form__set signin__form-set'>
          <label className='form__field signin__form-field'>
            <input
              className='form__input form__signin-input'
              type='email'
              id='email'
              placeholder='E-mail'
              required
            ></input>
            <span className='form__error'></span>
          </label>
          <label className='form__field'>
            <input
              className='form__input form__signin-input'
              type='password'
              id='password'
              placeholder='Senha'
              minLength='8'
              required
            ></input>
            <span className='form__error'></span>
          </label>
        </fieldset>
        <button
          className='form__submit-button form__signin-submit-button'
          type='submit'
        >
          Entrar
        </button>
      </form>
      <p className='signin__text'>Ainda não é membro? Inscreva-se aqui!</p>
    </section>
  );
}

export default Signin;
