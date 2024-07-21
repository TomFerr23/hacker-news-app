import React, { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import Header from './components/Header';
import './index.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className={`min-h-screen ${theme}`}>
      <Header onToggleTheme={toggleTheme} onSearch={handleSearch} />
      <main className="p-4 bg-light dark:bg-dark text-light dark:text-dark">
        <NewsList searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default App;
