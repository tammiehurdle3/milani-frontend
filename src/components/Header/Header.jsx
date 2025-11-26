import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

// --- ICONS ---
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const Header = ({ isLoggedIn, navigate }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setPlayAnimation(true), 100);
  }, []);

  const handleNavClick = (page) => {
    if (navigate) navigate(page);
    setIsMenuOpen(false);
  };

  // LOGIC FOR GRID ICON
  const handleGridClick = () => {
    if (isLoggedIn) {
      handleNavClick('dashboard'); // Go to work
    } else {
      handleNavClick('about'); // Learn about the program
    }
  };

  const desktopNav = [
    { label: "The Program", action: 'about' },
    { label: "Community", action: 'community' },
    { label: "Help Center", action: 'faq' },
    { label: "Contact", action: 'contact' }
  ];

  const mobileNav = [
    ...desktopNav,
    { label: "Terms of Use", action: 'terms', secondary: true },
    { label: "Privacy Policy", action: 'privacy', secondary: true }
  ];

  const logoText = "MILANI";

  return (
    <header className={styles.headerFixed}>
      <div className={styles.gridContainer}>
        
        {/* 1. LEFT: Desktop Nav / Mobile Hamburger */}
        <div className={styles.leftZone}>
          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {desktopNav.map((item) => (
              <button key={item.label} onClick={() => handleNavClick(item.action)} className={styles.textLink}>
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Mobile Hamburger */}
          <div className={styles.mobileToggle}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.iconButton}>
               {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* 2. CENTER: Animated Logo */}
        <div className={styles.centerZone} onClick={() => handleNavClick('landing')}>
          <div className={styles.animatedLogoWrapper}>
            {logoText.split("").map((char, index) => (
              <span key={index} className={styles.charMask}>
                <span 
                  className={styles.charSlide} 
                  style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* 3. RIGHT: Icons */}
        <div className={styles.rightZone}>
          <button className={styles.iconButton} aria-label="Search"><SearchIcon /></button>
          <button className={styles.iconButton} onClick={() => handleNavClick(isLoggedIn ? 'dashboard' : 'login')}><UserIcon /></button>
          <button className={styles.iconButton} aria-label="Menu" onClick={handleGridClick}><DashboardIcon /></button>
        </div>

      </div>

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {mobileNav.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.action)}
              className={item.secondary ? styles.mobileLinkSecondary : styles.mobileLinkPrimary}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;