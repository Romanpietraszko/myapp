import { useState } from 'react';
import './CampaignPlanner.css';

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

  const addCampaign = () => {
    if (!name || !goal || !schedule) return alert('Uzupełnij wszystkie pola!');
    const newCampaign: Campaign = {
      id: Date.now(),
      name,
      goal,
      budget,
      schedule,
    };
    setCampaigns([...campaigns, newCampaign]);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setGoal('');
    setBudget(0);
    setSchedule('');
  };

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  return (
    <div className="campaign-planner">
      <h2>📊 Planer Kampanii</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Nazwa kampanii"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cel kampanii"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
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

      <h3>📌 Zapisane Kampanie:</h3>
      <ul>
        {campaigns.map((campaign) => (
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
