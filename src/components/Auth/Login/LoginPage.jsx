import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Smooth entrance
import styles from './LoginPage.module.css';
// Import Eye Icons
import { Eye, EyeOff } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const LoginPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', type: '' });
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when typing starts
    if (submissionStatus.message) setSubmissionStatus({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({ message: '', type: '' });

    if (!formData.email || !formData.password) {
      setSubmissionStatus({ message: 'Credentials required.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Connects to your Django Localhost 8001
      const response = await fetch(`${API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        
        setSubmissionStatus({ message: 'Identity Confirmed.', type: 'success' });
        
        // Slight delay for the user to read "Identity Confirmed" before redirecting
        setTimeout(() => {
          if (onNavigate) onNavigate('dashboard');
        }, 800);

      } else {
        setSubmissionStatus({ message: 'Access Denied. Check credentials.', type: 'error' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setSubmissionStatus({ message: 'Secure connection failed.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.splitLayout}>
      
      {/* --- LEFT: ART COLUMN (Matches Sign Up Page) --- */}
      <div className={styles.artColumn}>
        <div className={styles.imageWrapper}>
          <img 
            src="/images/mirror-art.jpg" 
            alt="Abstract Lipstick Illustration" 
            className={styles.vectorArt}
          />
          <div className={styles.grainOverlay}></div>
        </div>
        
        <div className={styles.artOverlay}>
          <h2 className={styles.artHeading}>FACE SET. <br/> MIND SET.</h2>
          <p className={styles.artSubtext}>Your content, managed beautifully.</p>
        </div>
      </div>

      {/* --- RIGHT: FORM COLUMN --- */}
      <div className={styles.formColumn}>
        <motion.div 
          className={styles.formContent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          <div className={styles.headerGroup}>
            <div className={styles.eyebrow}>Secure Entry</div>
            <h1 className={styles.title}>Creator Portal</h1>
            <p className={styles.subtitle}>Authenticate to access your active briefs.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Registered Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className={styles.input}
                  placeholder="••••••••" 
                  required
                  style={{ width: '100%', paddingRight: '40px' }} // Make room for the icon
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#A8A29E'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR / SUCCESS MESSAGE */}
            <div style={{ minHeight: '24px', marginTop: '0.5rem' }}>
              {submissionStatus.message && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className={`${styles.message} ${styles[submissionStatus.type]}`}
                >
                  {submissionStatus.message}
                </motion.p>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Enter Portal'}
            </button>
          </form>

          <div className={styles.footer}>
            <button onClick={() => onNavigate('signup')} className={styles.link}>
              Have an invite code? Activate Account
            </button>
            <br/>
            <button className={styles.forgotLink}>
              Lost credentials?
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default LoginPage;