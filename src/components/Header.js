import logo from '../assets/logo192.png'

function Header() {
  return (
    <header className='app-header'>
      <img src={ logo } alt='React logo' />
      <h1 className='custom-font'>The React Quiz</h1>
    </header>
  );
}

export default Header;
