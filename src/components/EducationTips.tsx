import React, { useState } from 'react';

// Endpoint Google Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

interface EducationTipsProps {
  categories: string[]; // Lista dostępnych kategorii
  defaultCategory?: string; // Domyślna kategoria (opcjonalna)
  initialCustomContext?: string; // Początkowy kontekst (opcjonalny)
  customContextPlaceholder?: string; // Placeholder dla pola kontekstu (opcjonalny)
  initialTipText?: string; // Tekst początkowy przed wygenerowaniem wskazówki
}

const EducationTips = ({
  categories,
  defaultCategory = categories[0],
  initialCustomContext = '', // Domyślnie pusty ciąg
  customContextPlaceholder = 'Np. sklep internetowy z odzieżą',
  initialTipText = 'Generuję wskazówkę...',
}: EducationTipsProps) => {
  const [tip, setTip] = useState<string>(initialTipText);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [customContext, setCustomContext] = useState<string>(initialCustomContext); // Stan dla kontekstu

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
  const handleCustomContextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomContext(e.target.value);
  };

  return (
    <div className="education-tips">
      {/* Wybór kategorii */}
      <label htmlFor="category">Wybierz kategorię:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Pole do wprowadzania kontekstu */}
      <label htmlFor="context">Dostosuj do swojej branży (opcjonalnie):</label>
      <input
        id="context"
        type="text"
        value={customContext} // Używamy stanu lokalnego
        onChange={handleCustomContextChange} // Aktualizujemy stan przy zmianie
        placeholder={customContextPlaceholder}
      />

      {/* Przycisk generowania wskazówki */}
      <button onClick={fetchTip} disabled={loading}>
        {loading ? 'Generowanie...' : 'Wygeneruj wskazówkę'}
      </button>

      {/* Wyświetlanie wskazówki */}
      <p className="tip-content">{loading ? 'Generowanie...' : tip}</p>
    </div>
  );
};

export default EducationTips;