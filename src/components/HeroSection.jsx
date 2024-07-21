// src/components/HeroSection.jsx
import React from 'react';
import logoLight from '../assets/logo.svg';
import logoDark from '../assets/logo-dark-theme.svg';

const HeroSection = ({ theme }) => {
  return (
    <section className="hero-section bg-light dark:bg-dark text-light dark:text-dark py-16 px-12 text-center">
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
        <button className="border-dark dark:bg-dark dark:text-light dark:border-light p-4 rounded border-2 mr-4">
          Get Started
        </button>
        <button className="border-dark dark:bg-dark dark:text-light dark:border-light p-4 rounded border-2">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
