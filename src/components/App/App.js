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
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [galleryData, setGalleryData] = useState({ title: '', link: '' });
  const [picture, setPicture] = useState('');

  const [isSavingPopupData, setIsSavingPopupData] = useState(false);

  const [isValidName, setIsValidName] = useState(false);
  const [isValidAbout, setIsValidAbout] = useState(false);

  const [isValidLink, setIsValidLink] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);

  const [isValidAvatarLink, setIsValidAvatarLink] = useState(false);

  const [isValidProfilePopupData, setIsValidProfilePopupData] = useState(false);
  const [isValidGalerryPopupData, setIsValidGalerryPopupData] = useState(false);
  const [isValidPicturePopupData, setIsValidPicturePopupData] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [selectedCardId, setSelectedCardId] = useState('');

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

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setUserFront({ name: user.name, about: user.about });
    setIsValidName(true);
    setIsValidAbout(true);
    setIsValidProfilePopupData(false);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setGalleryData({ title: '', link: '' });
    setIsValidLink(true);
    setIsValidTitle(true);
    setIsValidGalerryPopupData(false);
  }

  function handleDeletePlaceClick(cardId) {
    setDeletePlacePopupOpen(true);
    setSelectedCardId(cardId);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    setPicture('');
    setIsValidAvatarLink(true);
    setIsValidPicturePopupData(false);
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

  function handleProfilePopupValidation() {
    if (isValidName && isValidAbout) {
      setIsValidProfilePopupData(true);
      return;
    }
    setIsValidProfilePopupData(false);
  }

  function handleGalerryPopupValidation() {
    if (isValidLink && isValidTitle) {
      setIsValidGalerryPopupData(true);
      return;
    }
    setIsValidGalerryPopupData(false);
  }

  function handlePicturePopupValidation() {
    if (isValidAvatarLink) {
      setIsValidPicturePopupData(true);
      return;
    }
    setIsValidPicturePopupData(false);
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
          isActive={isValidProfilePopupData}
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
                  handleProfilePopupValidation();
                }}
              />
              <span
                className={`form__error person-error ${
                  isValidName ? `` : `form__error_visible`
                }`}
              >
                {`${
                  isValidName
                    ? ``
                    : `${
                        document.querySelector('.form__input_name')
                          .validationMessage
                      }`
                }`}
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
                  handleProfilePopupValidation();
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidAbout ? `` : `form__error_visible`
                }`}
              >
                {`${
                  isValidAbout
                    ? ``
                    : `${
                        document.querySelector('.form__input_about')
                          .validationMessage
                      }`
                }`}
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
          isActive={isValidGalerryPopupData}
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
                  handleGalerryPopupValidation();
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidTitle ? `` : `form__error_visible`
                }`}
              >{`${
                isValidTitle
                  ? ``
                  : `${
                      document.querySelector('.form__input_title')
                        .validationMessage
                    }`
              }`}</span>
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
                  handleGalerryPopupValidation();
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidLink ? `` : `form__error_visible`
                }`}
              >{`${
                isValidLink
                  ? ``
                  : `${
                      document.querySelector('.form__input_link')
                        .validationMessage
                    }`
              }`}</span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name={`picture`}
          title={`Alterar a foto do perfil`}
          buttonText={`Salvar`}
          isOpen={isEditAvatarPopupOpen}
          isSaving={isSavingPopupData}
          isActive={isValidPicturePopupData}
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
                  handlePicturePopupValidation();
                }}
              />
              <span
                className={`form__error about-error ${
                  isValidAvatarLink ? `` : `form__error_visible`
                }`}
              >{`${
                isValidAvatarLink
                  ? ``
                  : `${
                      document.querySelector('.form__input_picture')
                        .validationMessage
                    }`
              }`}</span>
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
