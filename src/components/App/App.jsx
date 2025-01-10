import { useEffect, useState } from 'react';

import loadingPhoto from '../../assets/images/profile/profile_loading_photo.png';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

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
      <CurrentUserContext.Provider value={currentUser}>
        <div className='body'>
          <div className='page'>
            <Header />
            <Main client={client}></Main>
            <Footer />
          </div>
          {/* <PopupWithForm
          // name={`confirmer`}
          onClose={closeAllPopups}
          title={`Tem certeza?`}
          buttonText={`Sim`}
          isOpen={isDeletePlacePopupOpen}
          isSaving={isSavingPopupData}
          isActive={true}
          handleApiRequest={handleDeleteCard}
          ></PopupWithForm> */}
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
