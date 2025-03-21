function Signup() {
  return (
    <section className='signup'>
      <h2 className='signup__title'>Inscrever-se</h2>
      <form className='form signup__form'>
        <fieldset className='form__set signup__form-set'>
          <label className='form__field signup__form-field'>
            <input
              className='form__input form__signup-input'
              type='email'
              id='email'
              placeholder='E-mail'
              required
            ></input>
            <span className={`form__error form__signup-error `}></span>
          </label>
          <label className='form__field'>
            <input
              className='form__input form__signup-input'
              type='password'
              id='password'
              placeholder='Senha'
              minLength='8'
              required
            ></input>
            <span className={`form__error form__signup-error `}></span>
          </label>
        </fieldset>
        <button
          type='submit'
          className={`form__submit-button form__signup-submit-button`}
        >
          Inscrever-se
        </button>
      </form>
      <p className='signup__text'>Já é um membro? Faça o login aqui!</p>
    </section>
  );
}

export default Signup;
