import React from 'react';
import './StrategyResult.css';

// Definiujemy interfejs dla propsów
interface StrategyResultProps {
  result: string;
}

const StrategyResult: React.FC<StrategyResultProps> = ({ result }) => {
  return (
    <div className="strategy-result">
      {/* Nagłówek */}
      <h2 className="result-title">💡 Wygenerowana Strategia:</h2>

      {/* Treść strategii */}
      <div className="result-content">
        {result ? (
          <pre className="result-text">{result}</pre>
        ) : (
          <p className="no-results">Brak wyników do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
};

export default StrategyResult;