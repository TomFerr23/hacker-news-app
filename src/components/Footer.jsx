import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const Footer = ({ theme, user, signIn, signOut }) => {
  const isLightTheme = theme === 'light';

  return (
    <footer className={`py-6 px-12 ${isLightTheme ? 'bg-dark text-custom-light' : 'bg-light text-custom-dark'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-start flex-col">
          <div className="flex items-center mb-2">
            <h1 className="text-4xl font-bold">
              Black <span className="italic font-light">Lotus</span>
            </h1>
            <img src={isLightTheme ? logoDark : logoLight} alt="Logo" className="w-12 h-12 ml-2 inline-block" />
          </div>
          <p className="text-sm">
            Discover the latest tech news, curated just for you.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/about" className="text-inherit">About Us</Link>
          <Link to="/user" className="text-inherit">Saved Articles</Link>
          {user ? (
            <button onClick={signOut} className="text-inherit">Sign Out</button>
          ) : (
            <button onClick={signIn} className="text-inherit">Sign In</button>
          )}
          <Link to="/contact" className="text-inherit">Contact Us</Link>
        </div>
      </div>
      <div className="text-sm text-center mt-4">
        © {new Date().getFullYear()} Black Lotus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
