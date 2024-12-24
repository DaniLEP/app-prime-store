import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#1E3A8A',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const menuButtonStyle = {
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const menuContainerStyle = {
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#1E3A8A',
    borderRadius: '8px',
    border: '2px white',
    boxShadow: '0px 4px 6px rgba(196, 195, 195, 0.1)',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out',
    maxHeight: isMenuOpen ? '200px' : '0',
  };

  const menuStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0',
  };

  const menuItemStyle = {
    padding: '10px 15px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const menuItemHoverStyle = {
    color: '#d1cfcf',
  };

  return (
    <header style={headerStyle}>
   <div className="flex items-center">
          <img
            src="/logo-header.png"
            alt="Logo-Easy-Point"
            style={{width: '190px', height: 'auto'}}          
          />
        </div>

      <button style={menuButtonStyle} onClick={toggleMenu}>
        ☰
      </button>
      <div style={menuContainerStyle}>
        <nav style={menuStyle}>
          <Link to={'/home'}  style={{textDecoration: 'none'}}>
          <div style={menuItemStyle} onMouseOver={(e) => (e.target.style.backgroundColor = '#d1cfcf')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
            Home
          </div>
            </Link>
            <Link to={'#sobre'}  style={{textDecoration: 'none'}}>
            <div style={menuItemStyle} onMouseOver={(e) => (e.target.style.backgroundColor = '#d1cfcf')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
            About me
          </div>
            </Link>
            <Link to={'#contato'}  style={{textDecoration: 'none'}}>
            <div style={menuItemStyle} onMouseOver={(e) => (e.target.style.backgroundColor = '#d1cfcf')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
            Contact
          </div>
            </Link>
            <Link to={'/'}  style={{textDecoration: 'none'}}>
            <div style={menuItemStyle} onMouseOver={(e) => (e.target.style.backgroundColor = '#d1cfcf')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
            Logoff
          </div>
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
