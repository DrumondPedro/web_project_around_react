import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import Card from '../Card/Card';

import client from '../../utils/api';

import loadingPhoto from '../../images/profile/profile_loading_photo.png';

function App() {
  const [user, setUser] = useState({
    name: '...',
    about: '...',
    avatar: loadingPhoto,
    _id: '000',
    cohort: '...',
  });
  const [userFront, setUserFront] = useState({});

  const [cardsList, setCardsList] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [galleryData, setGalleryData] = useState({ title: '', link: '' });
  const [picture, setPicture] = useState('');

  const [isSavingPopupData, setIsSavingPopupData] = useState(false);

  const [isValidName, setIsValidName] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isValidAbout, setIsValidAbout] = useState(false);
  const [aboutErrorMessage, setAboutErrorMessage] = useState('');

  const [isValidTitle, setIsValidTitle] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [isValidLink, setIsValidLink] = useState(false);
  const [linkErrorMessage, setLinkErrorMessage] = useState('');

  const [isValidAvatarLink, setIsValidAvatarLink] = useState(false);
  const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = useState('');
  const [avatarButtonState, setAvatarButtonState] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [selectedCardId, setSelectedCardId] = useState('');

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setUserFront({ name: user.name, about: user.about });
    setIsValidName(true);
    setIsValidAbout(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setGalleryData({ title: '', link: '' });
    setIsValidTitle(false);
    setIsValidLink(false);
  }

  function handleDeletePlaceClick(cardId) {
    setDeletePlacePopupOpen(true);
    setSelectedCardId(cardId);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    setPicture('');
    setAvatarButtonState(false);
    setIsValidAvatarLink(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name });
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
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
        closeAllPopups();
        setIsSavingPopupData(false);
        console.log(`${err} - Erro no PACH /users/me`);
      });
  }

  function handleGalerryPopupSubimit() {
    setIsSavingPopupData(true);
    client
      .addNewCard(galleryData, '/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((newCard) => {
        setCardsList([newCard, ...cardsList]);
        closeAllPopups();
        setIsSavingPopupData(false);
      })
      .catch((err) => {
        closeAllPopups();
        setIsSavingPopupData(false);
        console.log(`${err} - Erro no POST /cards`);
      });
  }

  function handlePicturePopupSubimit() {
    setIsSavingPopupData(true);
    client
      .updateUserAvatar(picture, '/users/me/avatar')
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
        closeAllPopups();
        setIsSavingPopupData(false);
        console.log(`${err} - Erro no PATCH /users/me/avatar`);
      });
  }

  function handleDeleteCard() {
    setIsSavingPopupData(true);
    client
      .deleteCard(selectedCardId, '/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        setCardsList(cardsList.filter((card) => card._id !== selectedCardId));
        closeAllPopups();
        setIsSavingPopupData(false);
        setSelectedCardId('');
      })
      .catch((err) => {
        closeAllPopups();
        setIsSavingPopupData(false);
        console.log(`${err} - Erro no DELETE /cards`);
        setSelectedCardId('');
      });
  }

  function handleLikeCard(id, path, executor) {
    client
      .like(id, path)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        executor(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDisikeCard(id, path, executor) {
    client
      .dislike(id, path)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        executor(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          <Main
            user={user}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
          >
            {cardsList.map((card, i) => (
              <Card
                key={i}
                card={card}
                userId={user._id}
                onDelete={handleDeletePlaceClick}
                onCardClick={handleCardClick}
                onDeslikeClick={handleDisikeCard}
                onLikeClick={handleLikeCard}
              ></Card>
            ))}
          </Main>
          <Footer />
        </div>
        <PopupWithForm
          name={`profile`}
          title={`Editar perfil`}
          buttonText={`Salvar`}
          isOpen={isEditProfilePopupOpen}
          isSaving={isSavingPopupData}
          isActive={isValidName && isValidAbout}
          onClose={closeAllPopups}
          handleApiRequest={handleProfilePopupSubimit}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className={`form__input form__input_name ${
                  isValidName ? `` : `form__input_type-error`
                }`}
                id='name'
                placeholder='Nome'
                required
                minLength='2'
                maxLength='40'
                value={userFront.name}
                onChange={(evt) => {
                  setUserFront({ ...userFront, name: evt.target.value });
                  setIsValidName(evt.target.validity.valid);
                  setNameErrorMessage(evt.target.validationMessage);
                }}
              />
              <span
                className={`form__error person-error ${
                  isValidName ? `` : `form__error_visible`
                }`}
              >
                {nameErrorMessage}
              </span>
            </label>
            <label className='form__field'>
              <input
                type='text'
                className={`form__input form__input_about ${
                  isValidAbout ? `` : `form__input_type-error`
                }`}
                id='about'
                placeholder='Sobre mim'
                required
                minLength='2'
                maxLength='200'
                value={userFront.about}
                onChange={(evt) => {
                  setUserFront({ ...userFront, about: evt.target.value });
                  setIsValidAbout(evt.target.validity.valid);
                  setAboutErrorMessage(evt.target.validationMessage);
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidAbout ? `` : `form__error_visible`
                }`}
              >
                {aboutErrorMessage}
              </span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name={`gallery`}
          title={`Novo local`}
          buttonText={`Criar`}
          isOpen={isAddPlacePopupOpen}
          isSaving={isSavingPopupData}
          isActive={isValidLink && isValidTitle}
          onClose={closeAllPopups}
          handleApiRequest={handleGalerryPopupSubimit}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='text'
                className={`form__input form__input_title ${
                  isValidTitle ? `` : `form__input_type-error`
                }`}
                id='title'
                placeholder='Título'
                required
                minLength='2'
                maxLength='30'
                value={galleryData.title}
                onChange={(evt) => {
                  setGalleryData({ ...galleryData, title: evt.target.value });
                  setIsValidTitle(evt.target.validity.valid);
                  setTitleErrorMessage(evt.target.validationMessage);
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidTitle ? `` : `form__error_visible`
                }`}
              >
                {titleErrorMessage}
              </span>
            </label>
            <label className='form__field'>
              <input
                type='url'
                className={`form__input form__input_link ${
                  isValidLink ? `` : `form__input_type-error`
                }`}
                id='link'
                placeholder='Link de imagem'
                required
                value={galleryData.link}
                onChange={(evt) => {
                  setGalleryData({ ...galleryData, link: evt.target.value });
                  setIsValidLink(evt.target.validity.valid);
                  setLinkErrorMessage(evt.target.validationMessage);
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidLink ? `` : `form__error_visible`
                }`}
              >
                {linkErrorMessage}
              </span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name={`picture`}
          title={`Alterar a foto do perfil`}
          buttonText={`Salvar`}
          isOpen={isEditAvatarPopupOpen}
          isSaving={isSavingPopupData}
          isActive={avatarButtonState}
          onClose={closeAllPopups}
          handleApiRequest={handlePicturePopupSubimit}
        >
          <fieldset className='form__set'>
            <label className='form__field'>
              <input
                type='url'
                className={`form__input form__input_picture ${
                  isValidAvatarLink ? `` : `form__input_type-error`
                }`}
                id='picture'
                placeholder='Link da foto'
                required
                value={picture}
                onChange={(evt) => {
                  setPicture(evt.target.value);
                  setIsValidAvatarLink(evt.target.validity.valid);
                  setAvatarLinkErrorMessage(evt.target.validationMessage);
                  setAvatarButtonState(
                    Array.from(
                      evt.target.parentElement.parentElement.parentElement
                        .elements
                    ).every((input) => input.validity.valid)
                  );
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidAvatarLink ? `` : `form__error_visible`
                }`}
              >
                {avatarLinkErrorMessage}
              </span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name={`confirmer`}
          title={`Tem certeza?`}
          buttonText={`Sim`}
          isOpen={isDeletePlacePopupOpen}
          isSaving={isSavingPopupData}
          isActive={true}
          onClose={closeAllPopups}
          handleApiRequest={handleDeleteCard}
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </>
  );
}

export default App;
