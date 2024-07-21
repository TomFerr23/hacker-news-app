import React from 'react';

const Header = ({ onToggleTheme, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="bg-light dark:bg-dark text-light dark:text-dark py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl">
        <span className="font-bold">Black</span>
        <span className="font-light italic">Lotus</span>
      </h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="border p-2 rounded mr-4 dark:bg-dark dark:text-light"
      />
      <button
        onClick={onToggleTheme}
        className="border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2"
      >
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;
