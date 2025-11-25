import React from 'react';
import styles from './DashboardPage.module.css';

const AnalyticsTab = () => {
  // Mock Data for Visuals
  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="animate-fade-in">
      <div className={styles.tabHeader}>
        <h1 className={styles.pageTitle}>Performance</h1>
        <p className={styles.pageSubtitle}>Track your content impact.</p>
      </div>

      {/* TOP ROW: KEY METRICS */}
      <div className={styles.gridThree}>
        <div className={styles.card}>
          <div className={styles.statLabel}>Total Reach</div>
          <div className={styles.statValue}>12.5K</div>
          <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.5rem' }}>+12% this month</div>
        </div>
        <div className={styles.card}>
          <div className={styles.statLabel}>Avg. Engagement</div>
          <div className={styles.statValue}>4.8%</div>
          <div style={{ fontSize: '0.8rem', color: '#A8A29E', marginTop: '0.5rem' }}>Industry avg: 2.5%</div>
        </div>
        
        {/* CHANGED: From Conversions (Not in Agreement) to Completion Rate */}
        <div className={styles.card}>
          <div className={styles.statLabel}>Completion Rate</div>
          <div className={styles.statValue}>82%</div>
          <div style={{ fontSize: '0.8rem', color: '#D4AF37', marginTop: '0.5rem' }}>High Retention</div>
        </div>
      </div>

      {/* MIDDLE ROW: CHART VISUALIZATION */}
      <div className={styles.card} style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 className={styles.sectionTitle} style={{ margin: 0 }}>Engagement History</h3>
          <select style={{ padding: '0.5rem', border: '1px solid #E5E5E5', borderRadius: '4px', color: '#57534E', fontFamily: 'Inter' }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        {/* CSS BAR CHART */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '0 1rem' }}>
          {bars.map((height, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '10%' }}>
              <div style={{ 
                width: '100%', 
                height: `${height}%`, 
                backgroundColor: i === 5 ? '#1C1917' : '#E5E5E5', // Highlight peak
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.5s ease'
              }}></div>
              <span style={{ fontSize: '0.7rem', color: '#A8A29E' }}>Day {i+1}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsTab;