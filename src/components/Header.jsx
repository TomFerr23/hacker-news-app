import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const Header = ({ theme, onToggleTheme, onSearch, user, signIn, signOut }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="bg-light dark:bg-dark text-light dark:text-dark py-4 px-12 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl flex items-center">
            <span className="font-bold">Black</span>
            <span className="font-light italic">Lotus</span>
          </h1>
          <img src={theme === 'light' ? logoLight : logoDark} alt="Logo" className="w-8 h-8 ml-2" />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="border p-2 rounded mr-4 dark:bg-dark dark:text-light"
      />
      <div className="flex items-center">
        {user ? (
          <>
            <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
            <Link to="/user" className="header-link mr-4 border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
              Saved Articles
            </Link>
            <button onClick={signOut} className="border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 mr-4">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={signIn} className="border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 mr-4">
            Sign In
          </button>
        )}
        <button
          onClick={onToggleTheme}
          className="border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2"
        >
          Toggle Theme
        </button>
      </div>
    </header>
  );
};

export default Header;
