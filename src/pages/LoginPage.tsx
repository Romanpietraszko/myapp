import { useNavigate } from 'react-router-dom'; // React Router
import log from '../log.png'; // Zaimportuj plik logo
import './LoginPage.css'; // Stylowanie

const LoginPage = () => {
  const navigate = useNavigate(); // Hook do nawigacji

  const handleLogoClick = () => {
    navigate('/home'); // Przekierowanie do głównej zawartości
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container" onClick={handleLogoClick}>
        <img 
          src={log} // Użyj zaimportowanego pliku
          alt="Logo Promolean" 
          className="logo-image animated-logo" // Dodajemy klasę CSS dla animacji
        />
      </div>
    </div>
  );
};

export default LoginPage;