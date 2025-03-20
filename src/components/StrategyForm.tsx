import { useState } from 'react';
import './StrategyForm.css'; // Import stylów

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

    const prompt = `Stwórz strategię marketingową dla celu: "${goal}", grupa docelowa: "${audience}", kanały: "${platforms}". Zaproponuj etapy kampanii, pomysły na treści (posty, rolki) i edukacyjne wskazówki.`;

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
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Nie udało się wygenerować strategii.';
      onGenerate(generatedText);
    } catch (error) {
      console.error('Błąd podczas generowania:', error);
      onGenerate('Wystąpił błąd podczas generowania strategii.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Generuj strategię marketingową</h2>
      <label>
        Cel kampanii:
        <input value={goal} onChange={(e) => setGoal(e.target.value)} required />
      </label>
      <label>
        Grupa docelowa:
        <input value={audience} onChange={(e) => setAudience(e.target.value)} required />
      </label>
      <label>
        Platformy (np. Instagram, TikTok):
        <input value={platforms} onChange={(e) => setPlatforms(e.target.value)} required />
      </label>
      <button type="submit">Generuj strategię</button>
    </form>
  );
};

export default StrategyForm;
