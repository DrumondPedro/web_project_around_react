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

  const [userEmail, setUserEmail] = useState({
    data: {
      _id: '000',
      email: '...',
    },
  });

  const handleUserInfo = async () => {
    try {
      const userData = await client.getUserInfo('/users/me');
      setCurrentUser(userData);
    } catch (error) {
      console.log(err);
      console.log('Erro no GET /users/me');
    }
  };

  const handleUserEmail = async (token) => {
    try {
      const userEmailData = await client.getUserEmail(
        '/users/me',
        token,
        'https://se-register-api.en.tripleten-services.com/v1'
      );
      setUserEmail(userEmailData);
    } catch (error) {
      console.log(error);
      console.log('Erro no GET /users/me');
    }
  };

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

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        userEmail,
        handleUserInfo,
        handleUserEmail,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
