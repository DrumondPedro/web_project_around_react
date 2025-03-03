import { useEffect, useState } from 'react';

import loadingPhoto from '../../assets/images/profile/profile_loading_photo.png';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import client from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: loadingPhoto,
    _id: '000',
    cohort: '...',
  });

  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    client
      .updateUserInfo(userData, '/users/me')
      .then((data) => {
        setCurrentUser(data);
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        handleClosePopup();
        setIsLoading(false);
        console.log(`${err} - Erro no PACH /users/me`);
      });
  };

  const handleUpdateAvatar = (picture) => {
    setIsLoading(true);
    client
      .updateUserAvatar(picture, '/users/me/avatar')
      .then((data) => {
        setCurrentUser(data);
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        handleClosePopup();
        setIsLoading(false);
        console.log(`${err} - Erro no PATCH /users/me/avatar`);
      });
  };

  function handleGalerryPopupSubimit(newCardData) {
    setIsLoading(true);
    client
      .addNewCard(newCardData, '/cards')
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        handleClosePopup();
        setIsLoading(false);
        console.log(`${err} - Erro no POST /cards`);
      });
  }

  function handleCardDelete(selectedCardId) {
    setIsLoading(true);
    client
      .deleteCard(selectedCardId, '/cards')
      .then(() => {
        setCards(cards.filter((card) => card._id !== selectedCardId));
        handleClosePopup();
        setIsLoading(false);
      })
      .catch((err) => {
        handleClosePopup();
        setIsLoading(false);
        console.log(`${err} - Erro no DELETE /cards`);
      });
  }

  function handleCardLike(id, path, executor) {
    client
      .like(id, path)
      .then((res) => {
        executor(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDisike(id, path, executor) {
    client
      .dislike(id, path)
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
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Erro no GET /users/me');
      });

    client
      .getInitialCards('/cards')
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
    <>
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
        <LoadingContext.Provider value={isLoading}>
          <div className='body'>
            <div className='page'>
              <Header />
              <Main
                popup={popup}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                onUpdateAvatar={handleUpdateAvatar}
                cards={cards}
                onAddPlaceSubmit={handleGalerryPopupSubimit}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardDislike={handleCardDisike}
              ></Main>
              <Footer />
            </div>
          </div>
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
