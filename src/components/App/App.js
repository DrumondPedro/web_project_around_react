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

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [profileData, setProfileData] = useState({ name: '', about: '' });
  const [galleryData, setGalleryData] = useState({ title: '', link: '' });
  const [picture, setPicture] = useState('');

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
        setProfileData({ name: `${data.name}`, about: `${data.about}` });
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

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main
            user={user}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
          >
            {cardsList.map((card, i) => (
              <Card key={i} card={card} userId={user._id}></Card>
            ))}
          </Main>
          <Footer />
        </div>
        <PopupWithForm
          title={`Editar perfil`}
          name={`profile`}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className='form__input form__input_name'
                id='name'
                placeholder='Nome'
                required
                minength='2'
                maxength='40'
                value={profileData.name}
                onChange={(evt) => {
                  setProfileData({ ...profileData, name: evt.target.value });
                }}
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
                value={profileData.about}
                onChange={(evt) => {
                  setProfileData({ ...profileData, about: evt.target.value });
                }}
              />
              <span className='form__error about-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title={`Novo local`}
          name={`gallery`}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className='form__input form__input_title'
                id='title'
                placeholder='Título'
                required
                minLength='2'
                maxLength='30'
                value={galleryData.title}
                onChange={(evt) => {
                  setGalleryData({ ...galleryData, title: evt.target.value });
                }}
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
                value={galleryData.link}
                onChange={(evt) => {
                  setGalleryData({ ...galleryData, link: evt.target.value });
                }}
              />
              <span className='form__error link-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title={`Alterar a foto do perfil`}
          name={`picture`}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='url'
                className='form__input form__input_picture'
                id='picture'
                placeholder='Link da foto'
                required
                value={picture}
                onChange={(evt) => {
                  setPicture(evt.target.value);
                }}
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
