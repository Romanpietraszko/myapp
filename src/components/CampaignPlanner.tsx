import { useState, useEffect } from 'react';
import './CampaignPlanner.css';

interface Campaign {
  id: number;
  name: string;
  goal: string;
  budget: number;
  schedule: string;
}

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  priorityId: number | null;
  campaignId: number | null;
}

// Komponent Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const CampaignPlanner: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState(0);
  const [schedule, setSchedule] = useState('');
  const [filter, setFilter] = useState('');

  // Priorytety
  const [priorities, setPriorities] = useState<{ id: number; name: string }[]>([]);

  // Zadania
  const [tasks, setTasks] = useState<Task[]>([]);

  // Modale
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Automatyczne ładowanie danych z localStorage
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaigns');
    if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
  }, []);

  // Automatyczne zapisywanie danych do localStorage
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Dodawanie kampanii
  const addCampaign = () => {
    if (!name || !goal || budget <= 0) return alert('Uzupełnij wszystkie wymagane pola!');
    const newCampaign: Campaign = {
      id: Date.now(),
      name,
      goal,
      budget,
      schedule: schedule || 'Brak harmonogramu',
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

  // Dodawanie priorytetu
  const addPriority = (newPriorityName: string) => {
    if (!newPriorityName.trim()) return alert('Nazwa priorytetu nie może być pusta!');
    const newPriority = { id: Date.now(), name: newPriorityName.trim() };
    setPriorities([...priorities, newPriority]);
    setIsPriorityModalOpen(false);
  };

  // Usuwanie priorytetu
  const deletePriority = (id: number) => {
    setPriorities(priorities.filter((priority) => priority.id !== id));
  };

  // Dodawanie zadania
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = { ...taskData, id: Date.now() };
    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false);
  };

  // Usuwanie zadania
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="campaign-planner">
      <h2>📊 Planer Kampanii i czasu</h2>

      {/* Sekcja priorytetów */}
      <section className="section">
        <h3>📋 Lista Priorytetów:</h3>
        <button onClick={() => setIsPriorityModalOpen(true)}>Dodaj Priorytet</button>
        <ul>
          {priorities.map((priority) => (
            <li key={priority.id}>
              {priority.name}
              <button onClick={() => deletePriority(priority.id)}>Usuń</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sekcja zadań */}
      <section className="section">
        <h3>📅 Lista Zadań:</h3>
        <button onClick={() => setIsTaskModalOpen(true)}>Dodaj Zadanie</button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.name}</strong>
              <br />
              📅 {task.startDate} - {task.endDate}
              <br />
              🔘 Priorytet: {task.priorityId || 'Brak'}
              <br />
              🎯 Kampania: {task.campaignId || 'Brak'}
              <button onClick={() => deleteTask(task.id)}>Usuń</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sekcja kampanii */}
      <section className="section">
        <h3>📌 Zapisane Kampanie:</h3>
        <input
          type="text"
          placeholder="Filtruj kampanie..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {campaigns
            .filter(({ name, goal }) =>
              filter
                ? name.toLowerCase().includes(filter.toLowerCase()) || goal.toLowerCase().includes(filter.toLowerCase())
                : true
            )
            .map((campaign) => (
              <li key={campaign.id}>
                <strong>{campaign.name}</strong> – {campaign.goal} – {campaign.budget} PLN
                <br />📅 {campaign.schedule}
                <button onClick={() => deleteCampaign(campaign.id)}>Usuń</button>
              </li>
            ))}
        </ul>
      </section>

      {/* Formularz dodawania kampanii */}
      <div className="form">
        <h3>📝 Dodaj Nową Kampanię</h3>
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
            <option value="Zwiększenie sprzedaży">Zwiększenie sprzedaży</option>
            <option value="Budowanie świadomości marki">Budowanie świadomości marki</option>
            <option value="Promocja produktów sezonowych">Promocja produktów sezonowych</option>
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
        {/* Przycisk dodający kampanię */}
        <button onClick={addCampaign}>Dodaj Kampanię</button>
      </div>

      {/* Modal dodawania priorytetu */}
      <Modal isOpen={isPriorityModalOpen} onClose={() => setIsPriorityModalOpen(false)}>
        <h4>Dodaj Priorytet</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newPriorityName = formData.get('priorityName') as string;
            addPriority(newPriorityName);
          }}
        >
          <input type="text" name="priorityName" placeholder="Nazwa priorytetu" required />
          <button type="submit">Dodaj</button>
        </form>
      </Modal>

      {/* Modal dodawania zadania */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
        <h4>Dodaj Zadanie</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const taskData = {
              name: formData.get('taskName') as string,
              startDate: formData.get('startDate') as string,
              endDate: formData.get('endDate') as string,
              priorityId: Number(formData.get('priorityId')) || null,
              campaignId: Number(formData.get('campaignId')) || null,
            };
            addTask(taskData);
          }}
        >
          <input type="text" name="taskName" placeholder="Nazwa zadania" required />
          <input type="date" name="startDate" required />
          <input type="date" name="endDate" required />
          <input type="number" name="priorityId" placeholder="ID priorytetu (opcjonalne)" />
          <input type="number" name="campaignId" placeholder="ID kampanii (opcjonalne)" />
          <button type="submit">Dodaj</button>
        </form>
      </Modal>
    </div>
  );
};

export default CampaignPlanner;