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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey) {
      console.error('Brak klucza API!');
      onGenerate('Błąd: Nie znaleziono klucza API.');
      return;
    }

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
        initialTipText="Kliknij, aby uzyskać wskazówkę..."
      />
       <h2>Generuj strategię marketingową</h2>

      {/* Formularz */}
      <form onSubmit={handleSubmit}>
        <label>
          Cel kampanii:
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Np. zwiększenie sprzedaży produktów"
            required
          />
        </label>
        <label>
          Grupa docelowa:
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Np. młodzi dorośli interesujący się modą"
            required
          />
        </label>
        <label>
          Platformy (np. Instagram, TikTok):
          <input
            value={platforms}
            onChange={(e) => setPlatforms(e.target.value)}
            placeholder="Np. Instagram, Facebook"
            required
          />
        </label>
        <button type="submit">Generuj strategię</button>
      </form>
    </div>
  );
};

export default StrategyForm;