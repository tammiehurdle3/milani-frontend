import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';

// Import the Logout Icon for the button
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// PASS 'onNavigate' PROP SO WE CAN LOG OUT
const CreatorProfile = ({ creator, onNavigate }) => {
  
  // ... existing state logic ...
  const [bio, setBio] = useState(creator?.profile?.bio || "");
  const [socials, setSocials] = useState({ 
    instagram: creator?.profile?.social_links?.instagram || "", 
    tiktok: creator?.profile?.social_links?.tiktok || "" 
  });

  useEffect(() => {
    if (creator) {
        setBio(creator.profile?.bio || "");
        setSocials({ 
            instagram: creator.profile?.social_links?.instagram || "", 
            tiktok: creator.profile?.social_links?.tiktok || "" 
        });
    }
  }, [creator]);

  return (
    <div className="animate-fade-in">
      <div className={styles.tabHeader}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Your public persona.</p>
      </div>

      <div className={styles.gridTwo}>
        
        {/* IDENTITY CARD */}
        <div className={styles.card} style={{ textAlign: 'center', height: 'fit-content' }}>
          {/* ... existing avatar logic ... */}
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#F5F5F4', 
            margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', fontFamily: 'Playfair Display, serif', color: '#1C1917', border: '1px solid #E5E5E5',
            overflow: 'hidden'
          }}>
            {creator?.profile?.profile_picture_url ? (
               <img src={creator.profile.profile_picture_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               creator?.username?.[0]?.toUpperCase() || 'C'
            )}
          </div>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
            @{creator?.username || 'Username'}
          </h2>
          
          <p style={{ color: '#A8A29E', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {creator?.email || 'email@example.com'}
          </p>
          
          <div style={{ borderTop: '1px solid #F5F5F4', paddingTop: '1.5rem' }}>
            <span style={{ 
              padding: '0.5rem 1.5rem', backgroundColor: '#C5A059', color: '#fff', 
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              borderRadius: '4px'
            }}>
              {creator?.profile?.tier || "Muse Tier"}
            </span>
          </div>
        </div>

        {/* DETAILS FORM */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>Details</h3>
          
          {/* ... existing form inputs ... */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Bio</label>
            <textarea 
              className={styles.textarea} rows="4" 
              value={bio} onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your style..."
            />
          </div>
          
          <div className={styles.gridTwo} style={{ gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label className={styles.label}>Instagram</label>
              <input 
                className={styles.input} type="text" 
                value={socials.instagram} 
                onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                placeholder="@username"
              />
            </div>
            <div>
              <label className={styles.label}>TikTok</label>
              <input 
                className={styles.input} type="text" 
                value={socials.tiktok} 
                onChange={(e) => setSocials({...socials, tiktok: e.target.value})}
                placeholder="@username"
              />
            </div>
          </div>

          <button className={styles.primaryBtn} style={{ width: '100%', marginBottom: '1.5rem' }}>Save Changes</button>

          {/* --- MOBILE ONLY LOGOUT BUTTON --- */}
          <button 
            className={styles.mobileLogoutBtn}
            onClick={() => onNavigate('logout')}
          >
            <LogoutIcon /> Sign Out
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreatorProfile;