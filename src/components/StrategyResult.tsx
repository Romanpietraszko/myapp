// Definiujemy interfejs dla propsów
import React from 'react';
import './StrategyResult.css';
interface StrategyResultProps {
    result: string;
  }
  
  const StrategyResult: React.FC<StrategyResultProps> = ({ result }) => {
    return (
      <div className='strategy-result'>
        <h2>Wygenerowana Strategia:</h2>
        <pre>{result}</pre>
      </div>
    );
  };
  
  export default StrategyResult;
  