import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import StrategyForm from '../components/StrategyForm';
import StrategyResult from '../components/StrategyResult';
import CampaignPlanner from '../components/CampaignPlanner';
import KnowledgeBase from '../components/KnowledgeBase';
import './Home.css';

const Home: React.FC = () => {
  const [strategy, setStrategy] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('generator');
 

 

 

  return (
    <div className="home-container">
      <h1>Promolean – Twórz Strategie z AI</h1>

      {/* Menu zakładek */}
      <div className="tabs">
        <button onClick={() => setActiveTab('generator')} className={activeTab === 'generator' ? 'active-tab' : ''}>
          Generator Strategii
        </button>
        <button onClick={() => setActiveTab('planner')} className={activeTab === 'planner' ? 'active-tab' : ''}>
          Planer Kampanii
        </button>
        <button onClick={() => setActiveTab('knowledge')} className={activeTab === 'knowledge' ? 'active-tab' : ''}>
          Baza Wiedzy
        </button>
      </div>

      {/* Zawartość zakładek */}
      <div className={`tab-content ${activeTab}-content fade-in`}>
        {activeTab === 'generator' && (
          <>
            <StrategyForm onGenerate={setStrategy} />
            {strategy && <StrategyResult result={strategy} />}
          </>
        )}
        {activeTab === 'planner' && <CampaignPlanner />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </div>

      {/* Przycisk powrotu do strony głównej */}
      <Link to="/" className="cta-button">
        Powrót do Strony Głównej
      </Link>
    </div>
  );
};

export default Home;