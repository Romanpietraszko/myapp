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
      <EducationTips
        categories={['SEO', 'Social Media', 'Content Marketing']}
        defaultCategory="Social Media"
        customContextPlaceholder={customContext || 'Brak danych.'} // Dynamiczny kontekst
      />

      <h2>📝 Generuj strategię marketingową</h2>

      {/* Formularz */}
      <form onSubmit={handleSubmit}>
        {/* Cel kampanii */}
        <label>
          🎯 Cel kampanii:
          <input
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              if (errors.goal) setErrors({ ...errors, goal: undefined }); // Usuń błąd po edycji
            }}
            placeholder="Np. zwiększenie sprzedaży produktów"
            required
          />
        </label>
        {errors.goal && <p className="error">{errors.goal}</p>}

        {/* Grupa docelowa */}
        <label>
          👥 Grupa docelowa:
          <input
            value={audience}
            onChange={(e) => {
              setAudience(e.target.value);
              if (errors.audience) setErrors({ ...errors, audience: undefined }); // Usuń błąd po edycji
            }}
            placeholder="Np. młodzi dorośli interesujący się modą"
            required
          />
        </label>
        {errors.audience && <p className="error">{errors.audience}</p>}

        {/* Platformy */}
        <label>
          📱 Platformy (np. Instagram, TikTok):
          <input
            value={platforms}
            onChange={(e) => {
              setPlatforms(e.target.value);
              if (errors.platforms) setErrors({ ...errors, platforms: undefined }); // Usuń błąd po edycji
            }}
            placeholder="Np. Instagram, Facebook"
            required
          />
        </label>
        {errors.platforms && <p className="error">{errors.platforms}</p>}

        {/* Przycisk generowania strategii */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generowanie...' : 'Generuj strategię'}
        </button>
      </form>
    </div>
  );
};

export default StrategyForm;