import React from 'react';
import styles from './Footer.module.css'; // Import CSS Module for Footer

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Placeholder content - Add your footer links/info here */}
      <p>© {new Date().getFullYear()} Milani Cosmetics. All rights reserved.</p>
      {/* Add links like Privacy Policy, Terms, Social Media, etc. */}
    </footer>
  );
};

export default Footer;