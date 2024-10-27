import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import Card from '../Card/Card';

import client from '../../utils/api';

function App() {
  const [user, setUser] = useState({});
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    client
      .getUserInfo('/users/me')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Erro no GET /users/me');
      });
  }, []);

  useEffect(() => {
    client
      .getInitialCards('/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setCardsList(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Erro no GET /cards');
        setCardsList([]);
      });
  }, []);

  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main user={user}>
            {cardsList.map((card, i) => (
              <Card key={i} card={card} userId={user._id}></Card>
            ))}
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
        <ImagePopup
          link={`https://images.unsplash.com/photo-1719937206498-b31844530a96?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          name={`Teste`}
        ></ImagePopup>
      </div>
    </>
  );
}

export default App;
