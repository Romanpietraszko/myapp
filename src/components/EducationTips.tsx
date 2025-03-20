import { useState } from 'react';
import './EducationTips.css';

// Endpoint Google Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

// Kategorie wskazówek
const categories = [
  'SEO',
  'Social Media',
  'Content Marketing',
  'Email Marketing',
  'Automatyzacja',
  'Analityka'
];

const EducationTips: React.FC = () => {
  const [tip, setTip] = useState<string>('Generuję wskazówkę...');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [customContext, setCustomContext] = useState<string>('');

  // Funkcja do pobrania wskazówki z Gemini
  const fetchTip = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Brak klucza API!');
      setTip('Nie można pobrać wskazówki – brak klucza API.');
      return;
    }

    try {
      setLoading(true);

      // Tworzymy prompt z wybraną kategorią i personalizacją
      const prompt = `
        Wygeneruj krótką, praktyczną wskazówkę z zakresu "${selectedCategory}".
        Wskazówka powinna być konkretna, zrozumiała i łatwa do wdrożenia.
        ${
          customContext
            ? `Dostosuj wskazówkę do kontekstu: ${customContext}.`
            : ''
        }
        Przykład: Jak poprawić wyniki kampanii w tej kategorii?
      `;

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const generatedTip = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedTip) {
        setTip(generatedTip);
      } else {
        setTip('Nie udało się wygenerować wskazówki.');
      }
    } catch (error) {
      console.error('Błąd podczas generowania wskazówki:', error);
      setTip('Wystąpił błąd podczas generowania wskazówki.');
    } finally {
      setLoading(false);
    }
  };

  // Obsługa zmiany kategorii
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Obsługa zmiany kontekstu
  const handleContextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomContext(e.target.value);
  };

  return (
    <div className="education-tips">
      <h3>💡 Wskazówka Marketingowa</h3>

      <label htmlFor="category">Wybierz kategorię:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="context">Dostosuj do swojej branży (opcjonalnie):</label>
      <input
        id="context"
        type="text"
        value={customContext}
        onChange={handleContextChange}
        placeholder="Np. sklep internetowy z odzieżą"
      />

      <button onClick={fetchTip} disabled={loading}>
        {loading ? 'Generowanie...' : 'Wygeneruj wskazówkę'}
      </button>

      <p className="tip-content">{loading ? 'Generowanie...' : tip}</p>
    </div>
  );
};

export default EducationTips;
