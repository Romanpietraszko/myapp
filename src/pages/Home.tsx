import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import StrategyForm from '../components/StrategyForm';
import StrategyResult from '../components/StrategyResult';
import EducationTips from '../components/EducationTips';
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
        <button onClick={() => setActiveTab('generator')} className={activeTab === 'generator' ? 'active' : ''}>
          Generator Strategii
        </button>
        <button onClick={() => setActiveTab('tips')} className={activeTab === 'tips' ? 'active' : ''}>
          Wskazówki Marketingowe
        </button>
        <button onClick={() => setActiveTab('planner')} className={activeTab === 'planner' ? 'active' : ''}>
          Planer Kampanii
        </button>
        <button onClick={() => setActiveTab('knowledge')} className={activeTab === 'knowledge' ? 'active' : ''}>
          Baza Wiedzy
        </button>
      </div>

      {/* Zawartość zakładek */}
      <div className="tab-content">
        {activeTab === 'generator' && (
          <>
            <StrategyForm onGenerate={setStrategy} />
            {strategy && <StrategyResult result={strategy} />}
          </>
        )}

        {activeTab === 'tips' && <EducationTips />}
        {activeTab === 'planner' && <CampaignPlanner />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </div>

      {/* Powrót do strony głównej */}
      <Link to="/" className="cta-button">
        Powrót do Strony Głównej
      </Link>
    </div>
  );
};

export default Home;
