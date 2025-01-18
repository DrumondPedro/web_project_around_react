import { useContext, useEffect, useState } from 'react';

import pencilPath from '../../assets/images/profile/profile_edit_button.svg';
import plusPath from '../../assets/images/profile/profile_add_button.svg';

import Popup from './components/Popup/Popup';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import NewCard from './components/Popup/components/NewCard/NewCard';
import Card from './components/Card/Card';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  onUpdateAvatar,
  isSaving,
  cards,
  onAddPlaceSubmit,
  onCardDelete,
  onCardLike,
  onCardDislike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const editAvatarPopup = {
    title: 'Alterar a foto do perfil',
    children: (
      <EditAvatar onUpdateAvatar={onUpdateAvatar} isSaving={isSaving} />
    ),
  };

  const editProfilePopup = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const newCardPopup = {
    title: 'Novo local',
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  return (
    <main className='content'>
      <section className='profile'>
        <button
          className='profile__picture-edit-button '
          onClick={() => {
            onOpenPopup(editAvatarPopup);
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
                onOpenPopup(editProfilePopup);
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
            onOpenPopup(newCardPopup);
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
              onCardDelete={onCardDelete}
              onOpenPopup={onOpenPopup}
              onDeslikeClick={onCardDislike}
              onLikeClick={onCardLike}
            ></Card>
          ))}
        </ul>
      </section>
      {popup && (
        <Popup title={popup.title} onClose={onClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
