import React, { useState } from 'react';
import './KnowledgeBase.css';

const articles = [
  {
    id: 1,
    title: 'Jak używać Generatora Strategii',
    content: 'W odpowiednie pola wpisz cel, grupę docelową i social media. Po kliknięciu "Generuj" otrzymasz strategię.',
    category: 'Generator Strategii',
    tags: ['generator', 'strategia', 'AI'],
  },
  {
    id: 2,
    title: 'Jak korzystać z generatora wskazówek marketingowych?',
    content: 'Wybierz kategorię z listy, np. SEO, a w drugie pole wpisz swoją branżę. Po kliknięciu "Wygeneruj Wskazówki" otrzymasz wskazówki.',
    category: 'Generator Wskazówek',
    tags: ['wskazówki', 'marketing', 'SEO'],
  },
  {
    id: 3,
    title: 'Jak korzystać z plannera kampanii?',
    content: 'W odpowiednie pola wpisz nazwę kampanii, cel kampanii, jaki zysk chcesz osiągnąć oraz datę od kiedy do kiedy planujesz to osiągnąć. Po kliknięciu "Dodaj Kampanię" otrzymasz planer kampanii.',
    category: 'Planner Kampanii',
    tags: ['planer', 'kampania', 'budżet'],
  },
  {
    id: 4,
    title: 'Jak korzystać z bazy wiedzy?',
    content: 'W odpowiednie pola wpisz szukany temat. Po kliknięciu "Szukaj" otrzymasz wyniki.',
    category: 'Baza Wiedzy',
    tags: ['wiedza', 'informacje', 'wyszukiwarka'],
  },
  {
    id: 5,
    title: 'Uprosczona definicja marketingu',
    content: 'Parafrazując Szekspira: Marketing czy nie marketing – oto jest pytanie. W różnych źródłach znajdziemy masę suchych, jak suhar po tygodniu, informacji o tym, jakże prostym zagadnieniu. W wielkim uproszczeniu, jak budowa cepa, marketing to proces posiadający różne, potrzebne elementy, takie jak strategie – z pewnością ulubione przez szachistów i Sun Tzu – które ostatecznie służą do zwiększenia różnych korzyści dla firmy.',
    category: 'Nauka',
    tags: ['generator', 'strategia', 'AI'],
  },
  {
    id: 6,
    title: 'Kilka nudnych, ale kluczowych elementów marketingu',
    content: 'Tutaj już na starcie nasuwa się porównanie z budowaniem czegoś z klocków LEGO... a jeśli nigdy się nimi nie bawiłeś, cóż, Twoja strata. Jednym z tych kluczowych elementów jest Marketing Mix (4P). Już na pierwszy rzut oka 4P brzmi jak "4 Problemy", ale nic bardziej mylnego! To akronim od angielskich słów: Produkt (Product), Miejsce (Place), Cena (Price) i Promocja (Promotion).Kolejnym elementem jest proces marketingowy, który – podobnie jak pieczony ser na pizzy – ciągnie się bez końca. Jeśli bawimy się w tworzenie skrótów, możemy nazwać go APWM (Analiza, Planowanie, Wdrażanie, Monitorowanie). Tak, brzmi poważnie, ale to tylko pozory.Dalej mamy coś, co pachnie empatią, czyli zrozumienie klienta. To tu wkracza grupa docelowa – mówiąc wprost, to ludzie, którym zamierzasz zaoferować swój produkt, często „chodząc z wazeliną”. Do tego dochodzą badania rynku, bo jak powiedział Sun Tzu: „Przyjaciół trzymaj blisko, a wrogów jeszcze bliżej”. Lepiej znać potrzeby klientów i działania konkurencji.Nie można też zapomnieć o otoczeniu marketingowym, bo choć sprzedawanie rzeczy własnej rodzinie to jakaś strategia, to jednak na dłuższą metę może nie wystarczyć. Wreszcie mamy budowanie relacji, bo w świecie marketingu liczy się coś więcej niż jednorazowa transakcja – trwałe więzi z klientami są podstawą sukcesu.',
    category: 'Generator Wskazówek',
    tags: ['wskazówki', 'marketing', 'SEO'],
  },
  {
    id: 7,
    title: 'Linki do dodatkowych materiałów o marketingu',
    content: `
      Oto kilka przydatnych materiałów edukacyjnych o marketingu:
      <ul>
        <li><a href="https://openstax.org/books/marketing-podstawy/pages/1-1-marketing-i-proces-marketingowy" target="_blank" rel="noopener noreferrer">OpenStax - Marketing i proces marketingowy</a></li>
        <li><a href="https://studiumprzedsiebiorczosci.pl/artykul/podstawy-marketingu-jak-zaczac-promowac-swoj-biznes/" target="_blank" rel="noopener noreferrer">Studium Przedsiębiorczości - Podstawy marketingu</a></li>
        <li><a href="https://www.youtube.com/watch?v=kx_ru_fr1t8" target="_blank" rel="noopener noreferrer">YouTube - Marketing HERO</a></li>
      </ul>
    `,
    category: 'Zasoby',
    tags: ['marketing', 'edukacja', 'linki'],
  },
];

const KnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [selectedTag, setSelectedTag] = useState('Wszystkie');
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);

  const categories = ['Wszystkie', ...new Set(articles.map((article) => article.category))];
  const tags = ['Wszystkie', ...new Set(articles.flatMap((article) => article.tags))];

  const filteredArticles = articles.filter((article) => {
    const searchMatch = article.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategory === 'Wszystkie' || article.category === selectedCategory;
    const tagMatch = selectedTag === 'Wszystkie' || article.tags.includes(selectedTag);
    return searchMatch && categoryMatch && tagMatch;
  });

  const toggleArticle = (id: number) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <div className="knowledge-base">
      <h2>📚 Baza Wiedzy</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Szukaj w bazie wiedzy..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="content">
        <div className="sidebar">
          {/* Tutaj możesz dodać menu boczne z kategoriami i tagami */}
        </div>
        <div className="articles">
          {filteredArticles.map((article) => (
            <div key={article.id} className="article">
              <h3 onClick={() => toggleArticle(article.id)}>
                {article.title}
                {expandedArticleId === article.id ? ' ⬆' : ' ⬇'}
              </h3>
              {expandedArticleId === article.id && (
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
