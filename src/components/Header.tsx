
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Promolean - Twórz Strategie z AI</h1>
      <h3>Generuj skuteczne strategie marketingowe w kilka minut oraz ucz się dzięki AI.</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Strona Główna</Link>
          </li>
          <li>
            <Link to="/home">Generator Strategii</Link>
          </li>
          <li>
            <Link to="/tips">Wskazówki Marketingowe</Link>
          </li>
          <li>
            <Link to="/campaign-planner">Planer Kampanii</Link>
          </li>
          <li>
            <Link to="/knowledge-base">Baza Wiedzy</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
