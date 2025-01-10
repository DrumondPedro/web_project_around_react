import { useContext, useEffect, useState } from 'react';

import pencilPath from '../../assets/images/profile/profile_edit_button.svg';
import plusPath from '../../assets/images/profile/profile_add_button.svg';

import Popup from './components/Popup/Popup';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import NewCard from './components/Popup/components/NewCard/NewCard';
import Card from './components/Card/Card';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function Main({ client }) {
  const [cards, setCards] = useState([]);

  const [popup, setPopup] = useState(null);
  // const [isSavingPopupData, setIsSavingPopupData] = useState('false');

  const currentUser = useContext(CurrentUserContext);

  const editAvatarPopup = {
    title: 'Alterar a foto do perfil',
    children: <EditAvatar handleApiRequest={handlePicturePopupSubimit} />,
  };

  const editProfilePopup = {
    title: 'Editar perfil',
    children: (
      <EditProfile
        user={currentUser}
        handleApiRequest={handleProfilePopupSubimit}
      />
    ),
  };

  const newCardPopup = {
    title: 'Novo local',
    children: <NewCard handleApiRequest={handleGalerryPopupSubimit} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handlePicturePopupSubimit(picture) {
    // setIsSavingPopupData(true);
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
        handleClosePopup();
        // setIsSavingPopupData(false);
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no PATCH /users/me/avatar`);
      });
  }

  function handleProfilePopupSubimit(userData) {
    // setIsSavingPopupData(true);
    client
      .updateUserInfo(userData, '/users/me')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setUser(data);
        handleClosePopup();
        // setIsSavingPopupData(false);
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no PACH /users/me`);
      });
  }

  function handleGalerryPopupSubimit(newCardData) {
    // setIsSavingPopupData(true);
    client
      .addNewCard(newCardData, '/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
        // setIsSavingPopupData(false);
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no POST /cards`);
      });
  }

  // function handleDeleteCard() {
  //   // setIsSavingPopupData(true);
  //   client
  //     .deleteCard(selectedCardId, '/cards')
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Error: ${res.status}`);
  //     })
  //     .then(() => {
  //       setCards(cards.filter((card) => card._id !== selectedCardId));
  //       closeAllPopups();
  //       // setIsSavingPopupData(false);
  //       setSelectedCardId('');
  //     })
  //     .catch((err) => {
  //       closeAllPopups();
  //       // setIsSavingPopupData(false);
  //       console.log(`${err} - Erro no DELETE /cards`);
  //       setSelectedCardId('');
  //     });
  // }

  // function handleDeletePlaceClick(cardId) {
  //   setDeletePlacePopupOpen(true);
  //   setSelectedCardId(cardId);
  // }

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
      .getInitialCards('/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Erro no GET /cards');
        setCards([]);
      });
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <button
          className='profile__picture-edit-button '
          onClick={() => {
            handleOpenPopup(editAvatarPopup);
          }}
        ></button>
        <img
          src={currentUser.avatar}
          alt='Imagem de perfil do usuário.'
          className='profile__picture'
        />
        <div className='profile__personal-information'>
          <div className='profile__personal-title'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-button'
              onClick={() => {
                handleOpenPopup(editProfilePopup);
              }}
            >
              <img
                src={pencilPath}
                alt='Ícone minimalista de um lápis'
                className='profile__edit-button-image'
              />
            </button>
          </div>
          <p className='profile__about'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          onClick={() => {
            handleOpenPopup(newCardPopup);
          }}
        >
          <img
            src={plusPath}
            alt='Ícone de um sinal de mais'
            className='profile__add-button-image'
          />
        </button>
      </section>
      <section className='gallery'>
        <ul className='gallery__cards'>
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              userId={currentUser._id}
              // onDelete={handleDeletePlaceClick}
              handleOpenPopup={handleOpenPopup}
              onDeslikeClick={handleDisikeCard}
              onLikeClick={handleLikeCard}
            ></Card>
          ))}
        </ul>
      </section>
      {popup && (
        <Popup title={popup.title} onClose={handleClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
