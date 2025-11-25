import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SignUpPage.module.css';

const SignUpPage = ({ onNavigate }) => {
  const [step, setStep] = useState(1); // 1 = Code Entry, 2 = Set Password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  
  // Real Data from Backend
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

  // STEP 1: VERIFY THE ACCESS CODE (Connects to Django)
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // 1. Call your Django Backend
      const response = await fetch(`${API_URL}/api/auth/verify-invite/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. If valid, save the details Django sent back
        setCreatorDetails({
          name: data.first_name, // e.g. "Sarah"
          email: data.email,     // e.g. "sarah@example.com"
          tier: data.tier        // e.g. "Muse Tier"
        });
        setStep(2); // Move to "Welcome, Sarah" screen
      } else {
        // 3. If invalid, show error from backend
        setErrorMessage(data.detail || "Invalid Access Code");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setErrorMessage("Connection failed. Ensure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: FINALIZE ACCOUNT (Create User)
  const handleFinalize = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: creatorDetails.name, // Use the name from the invite
          email: creatorDetails.email,   // Use the locked email from invite
          password: password,
          code: accessCode               // Send code so backend marks it as used
        }),
      });

      if (response.ok) {
        // Success! Redirect to Login
        onNavigate('login');
      } else {
        const data = await response.json();
        // Handle specific password errors if any
        setErrorMessage(data.password ? data.password[0] : "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("Connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.splitLayout}>
      
      {/* --- LEFT: VECTOR ART --- */}
      <div className={styles.artColumn}>
        <div className={styles.imageWrapper}>
          <img 
            src="/images/mirror-art(1).jpg" 
            alt="Abstract Beauty Illustration" 
            className={styles.vectorArt}
          />
          <div className={styles.grainOverlay}></div>
        </div>
        
        <div className={styles.artOverlay}>
          <h2 className={styles.artHeading}>Creator Collective</h2>
          <p className={styles.artSubtext}>The future of beauty is powered by you.</p>
        </div>
      </div>

      {/* --- RIGHT: FORM --- */}
      <div className={styles.formColumn}>
        <div className={styles.formContent}>
          
          <AnimatePresence mode="wait">
            
            {/* --- STATE 1: ENTER CODE --- */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.headerGroup}>
                  <h1 className={styles.title}>Private Access</h1>
                  <p className={styles.subtitle}>Enter your invitation code to initialize your portfolio.</p>
                </div>

                <form onSubmit={handleCodeSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Invitation Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MILANI-001"
                      value={accessCode} 
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())} 
                      className={styles.input}
                      style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                      required
                    />
                  </div>

                  {errorMessage && (
                    <p style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errorMessage}</p>
                  )}

                  <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying...' : 'Verify Access'}
                  </button>
                </form>
                
                <div className={styles.footer}>
                  Already initialized? 
                  <button onClick={() => onNavigate('login')} className={styles.loginLink}>Enter Portal</button>
                </div>
              </motion.div>
            )}

            {/* --- STATE 2: ESTABLISH CREDENTIALS --- */}
            {step === 2 && creatorDetails && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.headerGroup}>
                  <div style={{ fontSize: '0.75rem', color: '#D4AF37', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Identity Confirmed
                  </div>
                  {/* DYNAMIC NAME FROM BACKEND */}
                  <h1 className={styles.title}>Welcome, {creatorDetails.name}.</h1>
                  <p className={styles.subtitle}>
                    Your {creatorDetails.tier} agreement is active. <br/>
                    Please establish your security credentials to proceed.
                  </p>
                </div>

                <form onSubmit={handleFinalize} className={styles.form}>
                  
                  {/* Read Only Email - Shows we already know them */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Registered Email</label>
                    <input 
                      type="email" 
                      value={creatorDetails.email} 
                      disabled
                      className={styles.input}
                      style={{ backgroundColor: '#FAFAF9', color: '#78716C', border: 'none' }}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Set Password</label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className={styles.input}
                      required
                      autoFocus
                    />
                  </div>
                  
                  {errorMessage && (
                    <p style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errorMessage}</p>
                  )}

                  <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Initializing...' : 'Activate Portfolio'}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

export default SignUpPage;