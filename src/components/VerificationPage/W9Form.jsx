import React, { useState } from 'react';
import styles from './VerificationPage.module.css';

// Added submissionStatus prop
const W9Form = ({ onSubmit, submissionStatus }) => {
  const [formData, setFormData] = useState({
    name: '', businessName: '', address: '', city: '', state: '', zip: '', ssn: '', certification: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isRequiredDataComplete = formData.name && formData.address && formData.city && formData.zip && formData.ssn && formData.state;

    if (formData.certification && isRequiredDataComplete) {
        onSubmit(formData);
    } else {
        // Validation handled by disabled button state and required attributes
        console.error("W9 Form incomplete or not certified.");
    }
  };

  // Check if all primary required fields are filled
  const isFormValid = formData.certification && 
                      formData.name.trim() !== '' && 
                      formData.address.trim() !== '' && 
                      formData.city.trim() !== '' && 
                      formData.zip.trim() !== '' && 
                      formData.ssn.trim() !== '' &&
                      formData.state.trim() !== '';


  return (
    <div className={styles.w9Container}>
      <h2 className={styles.sectionTitle}>Tax Information (W-9)</h2>
      <p className={styles.instruction} style={{ marginBottom: '2rem' }}>
        Required by federal law for payouts. Data is encrypted.
      </p>

      {/* --- DISPLAY SUBMISSION ERROR MESSAGE --- */}
      {submissionStatus?.type === 'error' && (
          <p style={{ color: '#DC2626', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              ERROR: {submissionStatus.message}
          </p>
      )}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Legal Name</label>
          <input 
            required name="name" value={formData.name} onChange={handleChange}
            className={styles.input} placeholder="As shown on tax return"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Business Name (Optional)</label>
          <input 
            name="businessName" value={formData.businessName} onChange={handleChange}
            className={styles.input} placeholder="If different from above"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Address</label>
          <input 
            required name="address" value={formData.address} onChange={handleChange}
            className={styles.input} placeholder="Street address"
          />
        </div>

        <div className={styles.row}>
           <div className={styles.inputGroup}>
             <label className={styles.label}>City</label>
             <input required name="city" value={formData.city} onChange={handleChange} className={styles.input} />
           </div>
           <div className={styles.inputGroup}>
             <label className={styles.label}>ZIP Code</label>
             <input required name="zip" value={formData.zip} onChange={handleChange} className={styles.input} />
           </div>
        </div>
        
        {/* Added state field for completeness */}
        <div className={styles.inputGroup}>
             <label className={styles.label}>State/Province</label>
             <input required name="state" value={formData.state} onChange={handleChange} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>SSN or EIN</label>
          <input 
            required name="ssn" type="password" value={formData.ssn} onChange={handleChange}
            className={styles.input} placeholder="•••-••-••••"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input 
            type="checkbox" name="certification" id="cert"
            checked={formData.certification} onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="cert" className={styles.checkLabel}>
            Under penalties of perjury, I certify that the number shown on this form is my correct taxpayer identification number.
          </label>
        </div>

        <button 
          type="submit" 
          className={styles.primaryBtn}
          disabled={!isFormValid} // Use the comprehensive validation check
          style={{ width: '100%', marginTop: '1rem' }}
        >
          Submit & Verify
        </button>
      </form>
    </div>
  );
};

export default W9Form;