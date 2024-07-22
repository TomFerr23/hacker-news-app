import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const HeroSection = ({ theme }) => {
  const handleGetStartedClick = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section bg-light dark:bg-dark text-light dark:text-dark py-16 px-12 text-center relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Black <span className="italic font-light">Lotus</span>
        <img src={theme === 'light' ? logoLight : logoDark} alt="Logo" className="w-8 h-8 ml-2 inline-block animate-float" />
      </h1>
      <p className="text-xl mb-8">
        Discover the latest tech news, curated just for you. Save your favorite articles and stay updated 
        with the trends.<br />
        Read, explore, and engage with the tech community.
      </p>
      <div className="flex justify-center">
        <button onClick={handleGetStartedClick} className="hero-button border-dark dark:bg-dark dark:text-light dark:border-light p-4 rounded border-2 mr-4">
          Get Started
        </button>
        <button className="hero-button border-dark dark:bg-dark dark:text-light dark:border-light p-4 rounded border-2">
          <Link to="/about" className="text-inherit no-underline">Learn More</Link>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
