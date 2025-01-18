import { useEffect, useState } from 'react';

import loadingPhoto from '../../assets/images/profile/profile_loading_photo.png';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import client from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';

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

  // const [isSavingPopupData, setIsSavingPopupData] = useState('true');

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = (userData) => {
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
        setCurrentUser(data);
        handleClosePopup();
        // setIsSavingPopupData(false);
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no PACH /users/me`);
      });
  };

  const handleUpdateAvatar = (picture) => {
    // console.log(isSavingPopupData);
    // client
    //   .updateUserAvatar(picture, '/users/me/avatar')
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     return Promise.reject(`Error: ${res.status}`);
    //   })
    //   .then((data) => {
    //     setCurrentUser(data);
    //     handleClosePopup();
    //     setIsSavingPopupData(false);
    //     console.log(isSavingPopupData);
    //   })
    //   .catch((err) => {
    //     handleClosePopup();
    //     setIsSavingPopupData(false);
    //     console.log(isSavingPopupData);
    //     console.log(`${err} - Erro no PATCH /users/me/avatar`);
    //   });
  };

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

  function handleCardDelete(selectedCardId) {
    // setIsSavingPopupData(true);
    client
      .deleteCard(selectedCardId, '/cards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        setCards(cards.filter((card) => card._id !== selectedCardId));
        handleClosePopup();
        // setIsSavingPopupData(false);
        // setSelectedCardId('');
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no DELETE /cards`);
        // setSelectedCardId('');
      });
  }

  // function handleDeletePlaceClick(cardId) {
  //   setDeletePlacePopupOpen(true);
  //   setSelectedCardId(cardId);
  // }

  function handleCardLike(id, path, executor) {
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

  function handleCardDisike(id, path, executor) {
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
        setCurrentUser(data);
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
        <div className='body'>
          <div className='page'>
            <Header />
            <Main
              popup={popup}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              onUpdateAvatar={handleUpdateAvatar}
              // isSaving={isSavingPopupData}
              cards={cards}
              onAddPlaceSubmit={handleGalerryPopupSubimit}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardDislike={handleCardDisike}
            ></Main>
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
