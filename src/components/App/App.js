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
  const [userFront, setUserFront] = useState({});

  const [cardsList, setCardsList] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [galleryData, setGalleryData] = useState({ title: '', link: '' });
  const [picture, setPicture] = useState('');

  const [isSavingPopupData, setIsSavingPopupData] = useState(false);

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

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setUserFront({ name: user.name, about: user.about });
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

  function handleProfilePopupSubimit() {
    setIsSavingPopupData(true);
    client
      .updateUserInfo(
        { name: userFront.name, about: userFront.about },
        '/users/me'
      )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setUser(data);
        closeAllPopups();
        setIsSavingPopupData(false);
      })
      .catch((err) => {
        console.log(err);
        closeAllPopups();
        setIsSavingPopupData(false);
      });
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
          name={`profile`}
          title={`Editar perfil`}
          isOpen={isEditProfilePopupOpen}
          isSaving={isSavingPopupData}
          onClose={closeAllPopups}
          handleApiRequest={handleProfilePopupSubimit}
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
                value={userFront.name}
                onChange={(evt) => {
                  setUserFront({ ...userFront, name: evt.target.value });
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
                value={userFront.about}
                onChange={(evt) => {
                  setUserFront({ ...userFront, about: evt.target.value });
                }}
              />
              <span className='form__error about-error'></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name={`gallery`}
          title={`Novo local`}
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
          name={`picture`}
          title={`Alterar a foto do perfil`}
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
