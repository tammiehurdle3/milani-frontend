import React, { useState, useEffect } from 'react';

// COMPONENT IMPORTS
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SignUpPage from './components/Auth/SignUp/SignUpPage.jsx'; 
import LoginPage from './components/Auth/Login/LoginPage.jsx';
import Header from './components/Header/Header.jsx';
import DashboardPage from './components/DashboardPage/DashboardPage.jsx';
import VerificationPage from './components/VerificationPage/VerificationPage.jsx';

import styles from './App.module.css'; 
import './App.css'; 

function App() {
  // --- 1. PERSISTENT STATE INITIALIZATION ---
  // We check localStorage *immediately* when the app starts.
  // If a token exists, we start on the dashboard (or last visited page).
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const token = localStorage.getItem('accessToken');
      return !!token; // Returns true if token exists, false if null
    } catch (e) {
      return false;
    }
  });

  // Set initial page based on login status
  const [currentPage, setCurrentPage] = useState(() => {
    return isLoggedIn ? 'dashboard' : 'landing';
  });

  const handleNavigate = (page) => {
    if (page === 'logout') {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setCurrentPage('landing');
      return;
    }
    
    if (page === 'dashboard') {
      // Double check we have a token before allowing entry
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        // If they try to go to dashboard but have no token, force login
        setCurrentPage('login');
        return;
      }
    }
    
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Render Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={handleNavigate} />;
      case 'signup': return <SignUpPage onNavigate={handleNavigate} />;
      case 'login': return <LoginPage onNavigate={handleNavigate} />;
      case 'dashboard': return <DashboardPage onNavigate={handleNavigate} />;
      case 'verification': return <VerificationPage onNavigate={handleNavigate} />;
      
      // Content Pages (Fallbacks)
      case 'about': 
      case 'community':
      case 'faq':
      case 'contact':
      case 'terms':
      case 'privacy':
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center bg-[#FAFAF9] p-8">
                <h1 className="text-4xl font-serif italic text-[#1C1917] mb-4 capitalize">{currentPage}</h1>
                <p className="text-gray-500 text-center max-w-md">This page is currently under construction for the {currentPage} section.</p>
                <button onClick={() => handleNavigate('landing')} className="mt-8 px-6 py-3 bg-[#1C1917] text-white rounded-md text-sm uppercase tracking-widest">Back Home</button>
            </div>
        );

      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      
      {/* HEADER LOGIC: Hide on Dashboard AND Verification (Focus Mode) */}
      {currentPage !== 'dashboard' && currentPage !== 'verification' && (
        <Header 
          isLoggedIn={isLoggedIn} 
          navigate={handleNavigate} 
        />
      )}

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;