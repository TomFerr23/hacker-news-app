import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const Footer = ({ theme, user, signIn, signOut }) => {
  const isLightTheme = theme === 'light';

  return (
    <footer className={`py-6 px-6 md:px-12 ${isLightTheme ? 'bg-dark text-custom-light' : 'bg-light text-custom-dark'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-col items-start md:items-center mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <h1 className="text-2xl md:text-4xl font-bold">
              Black <span className="italic font-light">Lotus</span>
            </h1>
            <img src={isLightTheme ? logoDark : logoLight} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 ml-2 inline-block" />
          </div>
          <p className="text-sm text-center md:text-left">
            Discover the latest tech news, curated just for you.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/about" className="text-inherit w-full md:w-auto text-center md:text-left">
            About Us
          </Link>
          <Link to="/user" className="text-inherit w-full md:w-auto text-center md:text-left">
            Saved Articles
          </Link>
          <Link to="/community" className="text-inherit w-full md:w-auto text-center md:text-left">
            Community
          </Link>
          {user ? (
            <button onClick={signOut} className="text-inherit w-full md:w-auto text-center md:text-left">
              Sign Out
            </button>
          ) : (
            <button onClick={signIn} className="text-inherit w-full md:w-auto text-center md:text-left">
              Sign In
            </button>
          )}
          <Link to="/contact" className="text-inherit w-full md:w-auto text-center md:text-left">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="text-sm text-center mt-4">
        © {new Date().getFullYear()} Black Lotus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
