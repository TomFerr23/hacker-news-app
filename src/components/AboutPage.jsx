// src/components/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-16 px-12 bg-light dark:bg-dark text-light dark:text-dark">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="mb-4">
        Welcome to Black Lotus, your go-to platform for the latest tech news. Our mission is to democratize the dissemination of information in the tech sector. We believe that everyone should have access to the latest news and trends in technology.
      </p>
      <p className="mb-4">
        Our team is composed of passionate tech enthusiasts who are dedicated to bringing you the most relevant and up-to-date information. Whether you're a tech professional or just someone interested in technology, Black Lotus has something for you.
      </p>
      <p className="mb-4">
        Thank you for visiting our site. We hope you find our platform informative and engaging.
      </p>
    </div>
  );
};

export default AboutPage;
