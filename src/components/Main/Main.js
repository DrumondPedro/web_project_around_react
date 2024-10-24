import loadingPhoto from '../../images/profile/profile_loading_photo.png';
import pencilPath from '../../images/profile/profile_edit_button.svg';
import plusPath from '../../images/profile/profile_add_button.svg';

function Main({ children }) {
  return (
    <main className='content'>
      <section className='profile'>
        <button className='profile__picture-edit-button'></button>
        <img
          src={loadingPhoto}
          alt='Imagem de perfil do usuário.'
          className='profile__picture'
        />
        <div className='profile__personal-information'>
          <div className='profile__personal-title'>
            <h1 className='profile__name'>...</h1>
            <button className='profile__edit-button'>
              <img
                src={pencilPath}
                alt='Ícone minimalista de um lápis'
                className='profile__edit-button-image'
              />
            </button>
          </div>
          <p className='profile__about'>...</p>
        </div>
        <button className='profile__add-button'>
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
