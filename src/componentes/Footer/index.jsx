import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "10px 5vw", 
        backgroundColor: '#1E3A8A',
        borderTop: "3px solid #ddd",
        fontSize: "14px",
        color: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
        boxSizing: "border-box",
        flexWrap: "wrap", 
      }}
    >
      {/* Logo and Links Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: "wrap",
          marginBottom: '10px',
          textAlign: 'center', 
          flex: '1 1 auto', 
        }}
      >
        {/* Logo */}
        <img
          src="./logo-header.png"
          alt="Logo"
          style={{
            width: '150px',
            height: 'auto',
            marginRight: '20px',
            marginBottom: '10px',
          }}
        />

        {/* Links */}
        <Link
          to={'/termos-de-privacidade'}
          style={{
            color: '#fff',
            textDecoration: 'none',
            margin: '0 15px',
            display: 'inline-block',
            fontSize: '14px',
          }}
        >
          Termos de Privacidade
        </Link>
        <span>|</span>
        <Link
          to={'/politica-de-privacidade'}
          style={{
            color: '#fff',
            textDecoration: 'none',
            margin: '0 15px',
            display: 'inline-block',
            fontSize: '14px',
          }}
        >
          Política de Privacidade
        </Link>
        <span>|</span>
        <Link
          to={'/termos-de-uso'}
          style={{
            color: '#fff',
            textDecoration: 'none',
            margin: '0 15px',
            display: 'inline-block',
            fontSize: '14px',
          }}
        >
          Termos de Uso
        </Link>
      </div>

      {/* Footer Bottom Section */}
      <div style={{ marginTop: '10px', textAlign: 'center', width: '100%' }}>
        <p>&copy; 2024 easyPoint! Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Footer;
