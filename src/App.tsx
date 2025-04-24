import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode === 'true' || false;
  });

  const [stars, setStars] = useState<any[]>([]); // Gwiazdy dla trybu ciemnego

  // Generowanie gwiazd
  const generateStars = () => {
    const newStars: any[] = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
      });
    }
    setStars(newStars);
  };

  useEffect(() => {
    const body = document.body;

    if (darkMode) {
      // Ustawienie ciemnego motywu
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      generateStars(); // Generuj gwiazdy w trybie ciemnym
    } else {
      // Tryb jasny
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      setStars([]); // Wyczyść gwiazdy
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        {/* Przycisk przełączania trybu */}
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Wyłącz ciekawy motyw' : 'Włącz ciekawy motyw'}
        </button>

        {/* Renderowanie gwiazd (tryb ciemny) */}
        {darkMode &&
          stars.length > 0 &&
          stars.map((star: any) => (
            <div
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
              }}
            ></div>
          ))}

        {/* Trasy */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;