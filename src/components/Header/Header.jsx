import { useContext, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import useWindowDimension from 'use-window-dimensions';

import { LoginContext } from '../../contexts/LoginContext';

import logo from '../../assets/images/header/logo.svg';
import closeIcon from '../../assets/images/header/header__menu_button_close.svg';
import gridIcon from '../../assets/images/header/header__menu_button_grid.svg';

function Header() {
  const location = useLocation();
  const { width } = useWindowDimension();

  const navigate = useNavigate();

  const { isLoggedIn, setIsloggedIn } = useContext(LoginContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpeningMenuMobile = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsloggedIn(false);
    navigate('/login');
  };

  const handleButtonSelectionNotLogged = () => {
    if (location.pathname === '/signin') {
      return (
        <button className='header__button' onClick={() => navigate('/signup')}>
          Inscrever-se
        </button>
      );
    }
    return (
      <button className='header__button' onClick={() => navigate('/signin')}>
        Entrar
      </button>
    );
  };

  const handleButtonSelectionLogged = () => {
    if (width <= 768) {
      return (
        <button
          onClick={handleOpeningMenuMobile}
          className='header__menu-button'
        >
          <img
            src={isMenuOpen ? closeIcon : gridIcon}
            alt='Ícone de um x'
            className='header__menu-button-image'
          />
        </button>
      );
    }

    return (
      <>
        <p className='header__email'>'emailtest@mail.com'</p>
        <button className='header__button' onClick={handleLogout}>
          Sair
        </button>
      </>
    );
  };

  useEffect(() => {
    if (width > 768) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <header className='header'>
      {isMenuOpen && (
        <div className='header__mobile-menu'>
          <p className='header__email'>'emailtest@mail.com'</p>
          <button className='header__button' onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
      <div className='header__content'>
        <img
          src={logo}
          alt='Logo escrito around the U.S.'
          className='header__logo'
        />
        <div className='header__menu'>
          {isLoggedIn
            ? handleButtonSelectionLogged()
            : handleButtonSelectionNotLogged()}
        </div>
      </div>
    </header>
  );
}

export default Header;
