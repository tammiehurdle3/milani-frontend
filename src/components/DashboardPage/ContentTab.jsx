import React from 'react';
import styles from './DashboardPage.module.css';

// Icon for empty state
const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);

const ContentTab = ({ onUpload, status }) => {
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTimeout(() => onUpload(), 1000);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.tabHeader}>
        <h1 className={styles.pageTitle}>Content Library</h1>
        <p className={styles.pageSubtitle}>Manage your campaign deliverables.</p>
      </div>

      {/* UPLOAD ZONE (Improved Empty State) */}
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}><UploadIcon /></div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
          Upload New Content
        </h3>
        <p className={styles.emptyText}>
          Supported formats: MP4, MOV. Max size: 500MB.
        </p>
        
        <label className={styles.primaryBtn} style={{ display: 'inline-block' }}>
          Select File
          <input 
            type="file" accept="video/*" onChange={handleFileChange} style={{ display: 'none' }} 
          />
        </label>
      </div>

      {/* RECENT UPLOADS */}
      <div style={{ marginTop: '4rem' }}>
        <div className={styles.statLabel}>Recent Activity</div>
        
        {status === 'uploaded' || status === 'approved' ? (
           <div className={styles.card} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '60px', height: '60px', background: '#000', borderRadius: '4px' }}></div> {/* Thumbnail Placeholder */}
               <div>
                 <div style={{ fontWeight: 600, color: '#1C1917' }}>First_Impression_Final.mp4</div>
                 <div style={{ fontSize: '0.8rem', color: '#A8A29E' }}>Uploaded today</div>
               </div>
             </div>
             <span style={{ 
               padding: '0.4rem 1rem', background: '#FFF1F2', color: '#EC4899', 
               fontSize: '0.75rem', fontWeight: 700, borderRadius: '20px' 
             }}>
               PENDING REVIEW
             </span>
           </div>
        ) : (
           <p style={{ color: '#A8A29E', fontSize: '0.9rem', fontStyle: 'italic' }}>No previous uploads found.</p>
        )}
      </div>
    </div>
  );
};

export default ContentTab;