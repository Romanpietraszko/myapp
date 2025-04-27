import { useState } from 'react';
import './StrategyForm.css'; // Import stylów
import EducationTips from './EducationTips'; // Import komponentu EducationTips

// Import klucza API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

interface StrategyFormProps {
  onGenerate: (strategy: string) => void;
}

const StrategyForm: React.FC<StrategyFormProps> = ({ onGenerate }) => {
  const [goal, setGoal] = useState<string>('');
  const [audience, setAudience] = useState<string>('');
  const [platforms, setPlatforms] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Stan ładowania
  const [errors, setErrors] = useState<{ goal?: string; audience?: string; platforms?: string }>({});

  // Walidacja formularza
  const validateForm = (): boolean => {
    const newErrors: { goal?: string; audience?: string; platforms?: string } = {};

    if (!goal.trim()) {
      newErrors.goal = 'Cel kampanii jest wymagany.';
    }
    if (!audience.trim()) {
      newErrors.audience = 'Grupa docelowa jest wymagana.';
    }
    if (!platforms.trim()) {
      newErrors.platforms = 'Platformy są wymagane.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sprawdź, czy formularz jest poprawnie wypełniony
    if (!validateForm()) return;

    if (!apiKey) {
      console.error('Brak klucza API!');
      onGenerate('Błąd: Nie znaleziono klucza API.');
      return;
    }

    setIsLoading(true); // Rozpoczęcie ładowania

    const prompt = `Stwórz zwięzłą strategię marketingową dla: '${goal}'. Grupa docelowa: '${audience}', kanały: '${platforms}'. Wymień dokładnie 3 etapy kampanii, przykładowe treści (posty, rolki) i 3 praktyczne wskazówki.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Generuje strategie ...';
      onGenerate(generatedText);
    } catch (error) {
      console.error('Błąd podczas generowania:', error);
      onGenerate('Wystąpił błąd podczas generowania strategii.');
    } finally {
      setIsLoading(false); // Zakończenie ładowania
    }
  };

  // Kontekst dla wskazówek
  const customContext = `${goal ? `Cel: ${goal}. ` : ''}${audience ? `Grupa docelowa: ${audience}. ` : ''}${
    platforms ? `Platformy: ${platforms}.` : ''
  }`;

  return (
    <div className="strategy-form-container">
      {/* Sekcja z wskazówkami */}
      <div className="education-tips-section">
        <h3>💡 Wskazówki Dla Ciebie</h3>
        <EducationTips
          categories={['SEO', 'Social Media', 'Content Marketing']}
          defaultCategory="Social Media"
          customContextPlaceholder={customContext || 'Brak danych.'} // Dynamiczny kontekst
        />
      </div>

      <div className="form-section">
        <h2>📝 Generuj Strategię Marketingową</h2>

        {/* Formularz */}
        <form onSubmit={handleSubmit}>
          {/* Cel kampanii */}
          <label className="form-label">
            🎯 Cel Kampanii:
            <input
              type="text"
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
                if (errors.goal) setErrors({ ...errors, goal: undefined }); // Usuń błąd po edycji
              }}
              placeholder="Np. zwiększenie sprzedaży produktów"
              className={`form-input ${errors.goal ? 'error-input' : ''}`}
            />
          </label>
          {errors.goal && <p className="error">{errors.goal}</p>}

          {/* Grupa docelowa */}
          <label className="form-label">
            👥 Grupa Docelowa:
            <input
              type="text"
              value={audience}
              onChange={(e) => {
                setAudience(e.target.value);
                if (errors.audience) setErrors({ ...errors, audience: undefined }); // Usuń błąd po edycji
              }}
              placeholder="Np. młodzi dorośli interesujący się modą"
              className={`form-input ${errors.audience ? 'error-input' : ''}`}
            />
          </label>
          {errors.audience && <p className="error">{errors.audience}</p>}

          {/* Platformy */}
          <label className="form-label">
            📱 Platformy (np. Instagram, TikTok):
            <input
              type="text"
              value={platforms}
              onChange={(e) => {
                setPlatforms(e.target.value);
                if (errors.platforms) setErrors({ ...errors, platforms: undefined }); // Usuń błąd po edycji
              }}
              placeholder="Np. Instagram, Facebook"
              className={`form-input ${errors.platforms ? 'error-input' : ''}`}
            />
          </label>
          {errors.platforms && <p className="error">{errors.platforms}</p>}

          {/* Przycisk generowania strategii */}
          <button type="submit" disabled={isLoading} className="generate-button">
            {isLoading ? 'Generowanie...' : 'Generuj Strategię'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StrategyForm;