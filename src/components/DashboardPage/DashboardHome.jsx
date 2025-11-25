import React from 'react';
import { motion } from 'framer-motion';
import styles from './DashboardPage.module.css';

// --- ICONS ---
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const DashboardHome = ({ creator, campaign, onNavigate }) => {
  
  const showDeadline = campaign.submissionStatus === 'pending';
  const showBalance = campaign.submissionStatus === 'approved';
  
  // Animation for the "Standard" elements (Fade in up)
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      
      {/* --- GREETING HEADER --- */}
      <motion.div 
        variants={itemVariants}
        style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.03)' 
        }}
      >
        
        {/* LEFT: AVATAR & NAME */}
        <div 
          onClick={() => onNavigate('profile')}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          {/* Avatar Container */}
          <div style={{ 
            width: '56px', height: '56px', borderRadius: '50%', 
            backgroundColor: '#F5F5F4', 
            border: '1px solid #E7E5E4',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
          }}>
            {creator?.profile?.profile_picture_url ? (
               <img src={creator.profile.profile_picture_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#1C1917' }}>
                 {creator?.username?.[0]?.toUpperCase()}
               </span>
            )}
          </div>

          <div>
            <h1 className={styles.pageTitle} style={{ fontSize: '1.75rem', marginBottom: '0' }}>
              Hello, {creator?.username || 'Creator'}
            </h1>
            <span style={{ fontSize: '0.85rem', color: '#78716C' }}>Welcome back to Milani.</span>
          </div>
        </div>

        {/* RIGHT: NOTIFICATION BELL (The Badge) */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            width: '48px', height: '48px', borderRadius: '50%', 
            backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative', color: '#1C1917',
            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
          }}
        >
          <BellIcon />
          
          {/* LUXURY BADGE: 
              1. Deep Red (#B91C1C) instead of bright red. 
              2. White Border (2px) to create the "cutout" look. 
          */}
          <span style={{ 
            position: 'absolute', top: '10px', right: '12px', 
            width: '10px', height: '10px', backgroundColor: '#B91C1C', 
            borderRadius: '50%', border: '2px solid #FFFFFF' 
          }}></span>
        </motion.button>

      </motion.div>

      {/* --- METRICS GRID --- */}
      <motion.div variants={itemVariants} className={styles.gridThree}>
        {/* Active Campaign */}
        <div className={styles.card}>
          <div className={styles.statLabel}>Active Campaign</div>
          <div className={styles.statValue} style={{ fontSize: '1.75rem', lineHeight: '1.2' }}>{campaign.title}</div>
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', background: '#D4AF37', borderRadius: '50%', boxShadow: '0 0 8px #D4AF37' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#57534E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {campaign.phase}
            </span>
          </div>
        </div>
        
        {/* Deadline */}
        <div className={styles.card}>
          <div className={styles.statLabel}>Next Deadline</div>
          <div className={styles.statValue}>
            {showDeadline ? "Nov 24" : "All Set"}
          </div>
          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: showDeadline ? '#B91C1C' : '#059669', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {showDeadline ? "Video Upload Required" : "Submission Received"}
          </div>
        </div>

        {/* Balance */}
        <div className={styles.card}>
          <div className={styles.statLabel}>Estimated Earnings</div>
          <div className={styles.statValue}>
            {showBalance ? "$1,250" : "$0.00"}
          </div>
          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#A8A29E', fontWeight: 500 }}>
            {showBalance ? "Payout scheduled Dec 1" : "Pending Approval"}
          </div>
        </div>
      </motion.div>

      {/* --- ACTION ROW --- */}
      <motion.div variants={itemVariants} className={styles.gridTwo} style={{ marginTop: '3rem' }}>
        
        {/* Mission Brief */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>Your Mission</h3>
          <p style={{ lineHeight: '2', color: '#57534E', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Create a 45-second vertical video showcasing your first impression of the Setting Spray. 
            Focus on the fine mist application and the scent. <strong style={{color:'#1C1917', borderBottom:'1px solid #D4AF37'}}>Natural lighting is key.</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className={styles.primaryBtn} onClick={() => onNavigate('content')}>
              Upload Content
            </button>
            <button onClick={() => onNavigate('campaigns')} className={styles.secondaryBtn}>
              Read Brief
            </button>
          </div>
        </div>

        {/* Onboarding Checklist - STATUS INDICATORS (Better than Badges here) */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className={styles.sectionTitle} style={{ margin: 0 }}>Status</h3>
            <span style={{ fontSize: '0.75rem', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Tracking #{campaign.trackingNumber.slice(-4)}
            </span>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { text: "Contract Signed", done: true },
              { text: "Product Shipped", done: true, link: campaign.trackingUrl },
              { text: "Content Uploaded", done: campaign.submissionStatus !== 'pending' },
              { text: "Approval Received", done: campaign.submissionStatus === 'approved' }
            ].map((item, i) => (
              <li key={i} style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', 
                color: item.done ? '#1C1917' : '#A8A29E', 
                opacity: item.done ? 1 : 0.6
              }}>
                {/* Custom Checkbox/Status Circle */}
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  border: item.done ? 'none' : '1px solid #D6D3D1',
                  backgroundColor: item.done ? '#1C1917' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                  transition: 'all 0.3s ease'
                }}>
                  {item.done && <CheckIcon />}
                </div>
                
                <span style={{ 
                  fontWeight: item.done ? 500 : 400, 
                  fontSize: '0.95rem',
                  textDecoration: item.done ? 'none' : 'none' 
                }}>
                  {item.text} 
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem', color: '#D4AF37', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Track
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;