import pencilPath from '../../assets/images/profile/profile_edit_button.svg';
import plusPath from '../../assets/images/profile/profile_add_button.svg';

function Main({
  user,
  children,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
}) {
  return (
    <main className='content'>
      <section className='profile'>
        <button
          className='profile__picture-edit-button '
          onClick={onEditAvatarClick}
        ></button>
        <img
          src={user.avatar}
          alt='Imagem de perfil do usuário.'
          className='profile__picture'
        />
        <div className='profile__personal-information'>
          <div className='profile__personal-title'>
            <h1 className='profile__name'>{user.name}</h1>
            <button
              className='profile__edit-button'
              onClick={onEditProfileClick}
            >
              <img
                src={pencilPath}
                alt='Ícone minimalista de um lápis'
                className='profile__edit-button-image'
              />
            </button>
          </div>
          <p className='profile__about'>{user.about}</p>
        </div>
        <button className='profile__add-button' onClick={onAddPlaceClick}>
          <img
            src={plusPath}
            alt='Ícone de um sinal de mais'
            className='profile__add-button-image'
          />
        </button>
      </section>
      <section className='gallery'>
        <ul className='gallery__cards'>{children}</ul>
      </section>
    </main>
  );
}

export default Main;
