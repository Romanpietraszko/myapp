import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  // Stan trybu ciemnego
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode === 'true' || false;
  });

  // Stan gwiazd
  const [stars, setStars] = useState<any[]>([]);

  // Generowanie gwiazd
  const generateStars = () => {
    const newStars: any[] = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        size: Math.random() * 2 + 1, // Losowy rozmiar gwiazdy
        animationDuration: Math.random() * 3 + 2 + 's', // Losowa długość animacji
        glowIntensity: Math.random() * 0.5 + 0.5, // Intensywność świecenia
      });
    }
    setStars(newStars);
  };

  // Efekt montowania i zmiany trybu
  useEffect(() => {
    const body = document.body;

    if (darkMode) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      generateStars(); // Generuj gwiazdy w trybie ciemnym
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      setStars([]); // Wyczyść gwiazdy
    }
  }, [darkMode]);

  // Przełączanie trybu
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        {/* Przycisk przełączania trybu */}
        <div className="mode-toggle-container">
          <button className="mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Jasny motyw' : '🌌 Ciekawy motyw'}
          </button>
        </div>

        {/* Renderowanie gwiazd (tryb ciemny) */}
        {darkMode &&
          stars.length > 0 &&
          stars.map((star: any) => (
            <div
              key={star.id}
              className="star"
              style={{
                top: star.top + 'px',
                left: star.left + 'px',
                width: star.size + 'px',
                height: star.size + 'px',
                boxShadow: `0 0 ${star.glowIntensity * 10}px ${star.glowIntensity * 5}px rgba(255, 255, 255, ${star.glowIntensity})`,
                animation: `twinkle ${star.animationDuration} infinite`,
              }}
            ></div>
          ))}

        {/* Tło z mgłą (tryb ciemny) */}
        {darkMode && (
          <div className="fog-overlay"></div>
        )}

        {/* Trasy */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1>404 - Strona nie znaleziona</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;