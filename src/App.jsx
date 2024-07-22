import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './components/NewsList';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import UserPage from './components/UserPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage'; // Import the new AboutPage component
import CommunityPage from './components/CommunityPage'; // Import the new CommunityPage component
import './index.css';
import { auth, signInWithGoogle, logOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme}`}>
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onSearch={handleSearch}
          user={user}
          signIn={signInWithGoogle}
          signOut={logOut}
        />
        <Routes>
          <Route path="/" element={
            <main className="p-4 bg-light dark:bg-dark text-light dark:text-dark">
              <HeroSection theme={theme} />
              <section id="articles">
                <NewsList searchTerm={searchTerm} />
              </section>
            </main>
          } />
          <Route path="/user" element={<UserPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} /> {/* Add the new route */}
          <Route path="/community" element={<CommunityPage />} /> {/* Add the new route */}
        </Routes>
        <Footer theme={theme} user={user} signIn={signInWithGoogle} signOut={logOut} />
      </div>
    </Router>
  );
};

export default App;
