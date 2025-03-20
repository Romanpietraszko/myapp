// Definiujemy interfejs dla propsów
interface StrategyResultProps {
    result: string;
  }
  
  const StrategyResult: React.FC<StrategyResultProps> = ({ result }) => {
    return (
      <div>
        <h2>Wygenerowana Strategia:</h2>
        <pre>{result}</pre>
      </div>
    );
  };
  
  export default StrategyResult;
  