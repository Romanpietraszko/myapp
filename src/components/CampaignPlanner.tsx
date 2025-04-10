import { useState, useEffect } from 'react';
import './CampaignPlanner.css';
import EducationTips from '../components/EducationTips'; // Import komponentu

interface Campaign {
  id: number;
  name: string;
  goal: string;
  budget: number;
  schedule: string;
}

const CampaignPlanner: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState(0);
  const [schedule, setSchedule] = useState('');
  const [filter, setFilter] = useState('');

  // Predefiniowane cele kampanii
  const goalFilters = ['Zwiększenie sprzedaży', 'Budowanie świadomości marki', 'Promocja produktów sezonowych'];

  // Automatyczne ładowanie danych z localStorage
  useEffect(() => {
    const saved = localStorage.getItem('campaigns');
    if (saved) setCampaigns(JSON.parse(saved));
  }, []);

  // Automatyczne zapisywanie danych do localStorage
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Dodawanie nowej kampanii
  const addCampaign = () => {
    if (!name || !goal || budget <= 0) return alert('Uzupełnij wszystkie wymagane pola!');
    const today = new Date();
    const endDate = new Date(today.setDate(today.getDate() + 7));
    const formatDate = (date: Date) =>
      `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    const newSchedule = schedule || `${formatDate(new Date())} - ${formatDate(endDate)}`;

    const newCampaign: Campaign = {
      id: Date.now(),
      name,
      goal,
      budget,
      schedule: newSchedule,
    };
    setCampaigns([...campaigns, newCampaign]);
    resetForm();
  };

  // Reset formularza
  const resetForm = () => {
    setName('');
    setGoal('');
    setBudget(0);
    setSchedule('');
  };

  // Usuwanie kampanii
  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  return (
    <div className="campaign-planner">
      <h2>📊 Planer Kampanii</h2>
      <EducationTips
        categories={['Social Media', 'Automatyzacja', 'Analityka']}
        defaultCategory="Social Media"
        customContextPlaceholder="Np. e-commerce platforma"
        initialTipText="Otrzymaj spersonalizowaną wskazówkę!"
      />
      {/* Formularz */}
      <div className="form">
        <input
          type="text"
          placeholder="Nazwa kampanii"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <label>Cel kampanii:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="">Wybierz cel...</option>
            {goalFilters.map((goalOption, index) => (
              <option key={index} value={goalOption}>
                {goalOption}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Wpisz własny cel..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <input
          type="number"
          placeholder="Budżet (PLN)"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Harmonogram (np. 01.04.2024 - 30.04.2024)"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button onClick={addCampaign}>Dodaj Kampanię</button>
      </div>

      {/* Filtr kampanii */}
      <input
        type="text"
        placeholder="Filtruj kampanie..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Lista kampanii */}
      <h3>📌 Zapisane Kampanie:</h3>
      <ul>
        {campaigns
          .filter(({ name, goal }) =>
            filter
              ? name.toLowerCase().includes(filter.toLowerCase()) || goal.toLowerCase().includes(filter.toLowerCase())
              : true
          )
          .sort((a, b) => {
            const dateA = new Date(a.schedule.split(' - ')[0].split('.').reverse().join('-'));
            const dateB = new Date(b.schedule.split(' - ')[0].split('.').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
          })
          .map((campaign) => (
            <li key={campaign.id}>
              <strong>{campaign.name}</strong> – {campaign.goal} – {campaign.budget} PLN
              <br />📅 {campaign.schedule}
              <button onClick={() => deleteCampaign(campaign.id)}>Usuń</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CampaignPlanner;