import logo from '../logo.png';

function Header(){
	return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	<p>Word Cloud for multi-languages</p>
      </header>
	);
}

export default Header;