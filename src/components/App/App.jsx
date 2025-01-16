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
        setCurrentUser(data);
        handleClosePopup();
        // setIsSavingPopupData(false);
      })
      .catch((err) => {
        handleClosePopup();
        // setIsSavingPopupData(false);
        console.log(`${err} - Erro no PATCH /users/me/avatar`);
      });
  };

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
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
        <div className='body'>
          <div className='page'>
            <Header />
            <Main
              client={client}
              popup={popup}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              onUpdateAvatar={handleUpdateAvatar}
            ></Main>
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
