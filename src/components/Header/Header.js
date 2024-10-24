import logo from '../../images/header/logo.svg';

function Header() {
  return (
    <header class='header'>
      <img src={logo} alt='Logo escrito around the U.S.' class='header__logo' />
    </header>
  );
}

export default Header;
