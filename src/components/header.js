import logo from '../logo.png';

function Header(){
	return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	<p>IRS</p>

	<h4>Word Cloud for multi-languages</h4>
      </header>
	);
}

export default Header;