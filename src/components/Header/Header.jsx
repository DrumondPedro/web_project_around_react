import logo from '../../assets/images/header/logo.svg';

function Header() {
  return (
    <header className='header'>
      <img
        src={logo}
        alt='Logo escrito around the U.S.'
        className='header__logo'
      />
    </header>
  );
}

export default Header;
