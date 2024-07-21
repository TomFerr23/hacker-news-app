// src/components/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto py-16 px-12 bg-light dark:bg-dark text-light dark:text-dark">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border rounded bg-card-bg-light dark:bg-card-bg-dark text-card-text-light dark:text-card-text-dark"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border rounded bg-card-bg-light dark:bg-card-bg-dark text-card-text-light dark:text-card-text-dark"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full p-3 border rounded bg-card-bg-light dark:bg-card-bg-dark text-card-text-light dark:text-card-text-dark"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-3 border rounded bg-card-bg-light dark:bg-card-bg-dark text-card-text-light dark:text-card-text-dark"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-dark text-light dark:bg-light dark:text-dark rounded hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-colors duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
