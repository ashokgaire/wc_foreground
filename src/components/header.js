import logo from '../logo.png';

function Header(){
	return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	<p>IRS</p>
      </header>
	);
}

export default Header;