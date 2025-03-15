import { createContext, useEffect, useState } from 'react';

import client from '../utils/api';

import loadingPhoto from '../assets/images/profile/profile_loading_photo.png';

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: loadingPhoto,
    _id: '000',
    cohort: '...',
  });

  const handleUpdateUser = async (userData) => {
    try {
      const userUpdated = await client.updateUserInfo(userData, '/users/me');
      setCurrentUser(userUpdated);
    } catch (err) {
      console.log(`${err} - Erro no PACH /users/me`);
    }
  };

  const handleUpdateAvatar = async (picture) => {
    try {
      const avatarUpdated = await client.updateUserAvatar(
        picture,
        '/users/me/avatar'
      );
      setCurrentUser(avatarUpdated);
    } catch (err) {
      console.log(`${err} - Erro no PATCH /users/me/avatar`);
    }
  };

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
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
