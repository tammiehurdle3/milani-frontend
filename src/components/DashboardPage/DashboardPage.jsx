import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';
import CreatorProfile from './CreatorProfile'; 
import DashboardHome from './DashboardHome'; 
import CampaignsTab from './CampaignsTab';
import ContentTab from './ContentTab'; 
import AnalyticsTab from './AnalyticsTab';

// --- ICONS (Keep your existing icons here) ---
const HomeIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const ProfileIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const ContentIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>);
const CampaignIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>);
const AnalyticsIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const PaymentIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>);
const LogoutIcon = () => (<svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>);

const DashboardPage = ({ onNavigate }) => {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); 
  
  // --- CAMPAIGN STATE ---
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';
  const [campaignData, setCampaignData] = useState({
    title: "Face Set. Mind Set.",
    phase: "Phase 1",
    status: "Active",
    trackingNumber: "1Z999AA10123456784", // Mock for now unless you added to backend
    trackingUrl: "https://www.ontrac.com/tracking/?number=1Z999AA10123456784",
    submissionStatus: "pending" 
  });

  // --- THE FIX: REAL DATA FETCHING ---
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        onNavigate('login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCreator(data); // This sets the REAL user data (Sarah, sarah@example.com)
          
          // Optional: If you updated serializer to send submission status
          // if (data.submission_status) {
          //    setCampaignData(prev => ({ ...prev, submissionStatus: data.submission_status }));
          // }
        } else {
          // Token invalid or expired
          localStorage.removeItem('accessToken');
          onNavigate('login');
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onNavigate]); 

  const handleTab = (target) => {
    if (target === 'verification') {
        onNavigate('verification');
    } else {
        setActiveTab(target);
        window.scrollTo(0,0);
    }
  };

  const handleUploadSuccess = () => {
    setCampaignData(prev => ({ ...prev, submissionStatus: 'uploaded' }));
    alert("Content Uploaded! Status updated.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': 
        return <DashboardHome 
                  creator={creator} 
                  campaign={campaignData} 
                  onNavigate={handleTab} 
               />;
      case 'profile': return <CreatorProfile creator={creator} onNavigate={onNavigate} />; 
      case 'content': 
        return <ContentTab onUpload={handleUploadSuccess} status={campaignData.submissionStatus} />;
      case 'campaigns': return <CampaignsTab creator={creator} />;
      case 'analytics': return <AnalyticsTab />;
      default: return <DashboardHome creator={creator} campaign={campaignData} onNavigate={handleTab} />;
    }
  };

  if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dashboardContainer}>
        
        {/* DESKTOP SIDEBAR */}
        <nav className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logo}>MILANI UGC</div>
          </div>
          
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Menu</div>
            <button className={`${styles.sidebarLink} ${activeTab === 'home' ? styles.activeLink : ''}`} onClick={() => setActiveTab('home')}>
              <HomeIcon /><span>Home</span>
            </button>
            <button className={`${styles.sidebarLink} ${activeTab === 'profile' ? styles.activeLink : ''}`} onClick={() => setActiveTab('profile')}>
              <ProfileIcon /><span>Profile</span>
            </button>
            <button className={`${styles.sidebarLink} ${activeTab === 'content' ? styles.activeLink : ''}`} onClick={() => setActiveTab('content')}>
              <ContentIcon /><span>Content</span>
            </button>
          </div>
          
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Campaigns</div>
            <button className={`${styles.sidebarLink} ${activeTab === 'campaigns' ? styles.activeLink : ''}`} onClick={() => setActiveTab('campaigns')}>
              <CampaignIcon /><span>Briefs</span>
            </button>
            <button className={`${styles.sidebarLink} ${activeTab === 'analytics' ? styles.activeLink : ''}`} onClick={() => setActiveTab('analytics')}>
              <AnalyticsIcon /><span>Analytics</span>
            </button>
            <button className={styles.sidebarLink} onClick={() => handleTab('verification')}>
              <PaymentIcon /><span>Payments</span>
            </button>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button className={styles.sidebarLink} onClick={() => onNavigate('logout')} style={{ color: '#EF4444' }}>
              <LogoutIcon /><span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <main className={styles.content}>
          {renderContent()}
        </main>
      </div>

      {/* MOBILE NAV */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.bottomNavLink} ${activeTab === 'home' ? styles.bottomNavActive : ''}`} onClick={() => setActiveTab('home')}>
          <HomeIcon /><span>Home</span>
        </button>
        <button className={`${styles.bottomNavLink} ${activeTab === 'campaigns' ? styles.bottomNavActive : ''}`} onClick={() => setActiveTab('campaigns')}>
          <CampaignIcon /><span>Briefs</span>
        </button>
        <button className={`${styles.bottomNavLink} ${activeTab === 'profile' ? styles.bottomNavActive : ''}`} onClick={() => setActiveTab('profile')}>
          <ProfileIcon /><span>Profile</span>
        </button>
        <button className={styles.bottomNavLink} onClick={() => handleTab('verification')}>
          <PaymentIcon /><span>Pay</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardPage;