import React from 'react';
import styles from './Header.module.css';

// --- ICONS (Your original Icons) ---
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const MenuIcon = () => ( // Using Menu Icon for mobile
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const Header = ({ isLoggedIn, navigate }) => { 
  
  const handleNavClick = (page) => {
    if (navigate) navigate(page);
  };

  const logoText = "MILANI";
  
  // The Links from the Screenshot
  const navLinks = [
    { label: "The Program", action: 'about' },
    { label: "Community", action: 'community' },
    { label: "Help Center", action: 'faq' },
    { label: "Contact", action: 'contact' }
  ];

  return (
    <header className={styles.headerStacked}>
      
      {/* --- ROW 1: LOGO & ICONS --- */}
      <div className={styles.topRow}>
        
        {/* Left Spacer (Keeps Logo Centered) */}
        <div style={{ flex: 1 }}></div>

        {/* CENTER: Animated Logo */}
        <div className={styles.animatedLogoWrapper} onClick={() => handleNavClick('landing')}>
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

        {/* RIGHT: Icons */}
        <div className={styles.rightZone}>
           <button className={styles.iconButton}><SearchIcon /></button>
           <button className={styles.iconButton} onClick={() => handleNavClick(isLoggedIn ? 'dashboard' : 'login')}>
             <UserIcon />
           </button>
           <button className={styles.iconButton}><MenuIcon /></button>
        </div>
      </div>

      {/* --- ROW 2: NAVIGATION (The Screenshot Layout) --- */}
      <nav className={styles.bottomRow}>
        {navLinks.map((link) => (
          <button 
            key={link.label} 
            onClick={() => handleNavClick(link.action)} 
            className={styles.navLink}
          >
            {link.label}
          </button>
        ))}
      </nav>

    </header>
  );
};

export default Header;