import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode === 'true' || false;
    });

    const [stars, setStars] = useState<any[]>([]); // Określenie typu dla stars

    useEffect(() => {
        const body = document.body;

        if (darkMode) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }

        const generateStars = () => {
            const newStars: any[] = []; // Określenie typu dla newStars
            for (let i = 0; i < 100; i++) {
                newStars.push({
                    id: i,
                    top: Math.random() * window.innerHeight,
                    left: Math.random() * window.innerWidth,
                });
            }
            setStars(newStars);
        };

        if (darkMode) {
            generateStars();
        } else {
            setStars([]);
        }

    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Wyłącz ciemny motyw' : 'Włącz ciemny motyw'}
                </button>
                {stars.length > 0 && stars.map((star: any) => ( // Określenie typu dla star
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            top: star.top,
                            left: star.left,
                        }}
                    ></div>
                ))}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
