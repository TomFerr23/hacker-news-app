import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const Header = ({ theme, onToggleTheme, onSearch, user, signIn, signOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-light dark:bg-dark text-light dark:text-dark py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center header-logo-link">
          <h1 className="text-2xl flex items-center">
            <span className="font-bold">Black</span>
            <span className="font-light italic">Lotus</span>
          </h1>
          <img src={theme === 'light' ? logoLight : logoDark} alt="Logo" className="w-8 h-8 ml-2 logo-shake" />
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/about" className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
          About Us
        </Link>
        <Link to="/user" className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
          Saved Articles
        </Link>
        <Link to="/community" className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
          Community
        </Link>
        {user ? (
          <button onClick={signOut} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
            Sign Out
          </button>
        ) : (
          <button onClick={signIn} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
            Sign In
          </button>
        )}
        <button onClick={onToggleTheme} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2">
          Toggle Theme
        </button>
      </div>
      <div className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          className="border p-2 rounded mr-4 dark:bg-dark dark:text-light"
        />
        {user && <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full" />}
      </div>
      <button onClick={toggleMenu} className="md:hidden">
        <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
      )}
      <nav className={`fixed top-0 right-0 w-2/3 max-w-xs h-full bg-light dark:bg-dark text-light dark:text-dark z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-2xl">&times;</button>
        </div>
        <div className="flex flex-col items-end space-y-4 p-4">
          <Link to="/about" onClick={toggleMenu} className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
            About Us
          </Link>
          <Link to="/user" onClick={toggleMenu} className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
            Saved Articles
          </Link>
          <Link to="/community" onClick={toggleMenu} className="header-link border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
            Community
          </Link>
          {user ? (
            <button onClick={() => { signOut(); toggleMenu(); }} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
              Sign Out
            </button>
          ) : (
            <button onClick={() => { signIn(); toggleMenu(); }} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
              Sign In
            </button>
          )}
          <button onClick={onToggleTheme} className="header-button border-dark dark:bg-dark dark:text-light dark:border-light p-2 rounded border-2 w-full text-right">
            Toggle Theme
          </button>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="border p-2 rounded dark:bg-dark dark:text-light w-full"
          />
          {user && <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full mx-auto" />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
