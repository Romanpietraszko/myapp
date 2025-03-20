
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div>
      <Header />
      <section className="hero">
        <h2>Generuj Skuteczne Strategie Marketingowe z AI</h2>
        <p>Wypróbuj nasze narzędzie i zwiększ efektywność swoich kampanii.</p>
        <Link to="/home" className="cta-button">
          Rozpocznij
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
