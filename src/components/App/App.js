import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function App() {
  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main>
            {/* {[1, 2, 3, 4, 5].map((num, i) => (
              <li key={i} style={{ color: 'white', height: 200, width: 200 }}>
                <p>{`Olá numero ${num}`}</p>
              </li>
            ))} */}
          </Main>
          <Footer />
        </div>
        <PopupWithForm title={`Editar perfil`} name={`profile`}>
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className='form__input form__input_name'
                id='person'
                placeholder='Nome'
                required
                minength='2'
                maxength='40'
              />
              <span className='form__error person-error'></span>
            </label>
            <label className='form__field'>
              <input
                type='text'
                className='form__input form__input_about'
                id='about'
                placeholder='Sobre mim'
                required
                minength='2'
                maxength='200'
              />
              <span className='form__error about-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm title={`Novo local`} name={`gallery`}>
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className='form__input form__input_title'
                id='name'
                placeholder='Título'
                required
                minLength='2'
                maxLength='30'
              />
              <span className='form__error name-error'></span>
            </label>
            <label className='form__field'>
              <input
                type='url'
                className='form__input form__input_link'
                id='link'
                placeholder='Link de imagem'
                required
              />
              <span className='form__error link-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm title={`Alterar a foto do perfil`} name={`picture`}>
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='url'
                className='form__input form__input_picture'
                id='picture'
                placeholder='Link da foto'
                required
              />
              <span className='form__error picture-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
      </div>
    </>
  );
}

export default App;
