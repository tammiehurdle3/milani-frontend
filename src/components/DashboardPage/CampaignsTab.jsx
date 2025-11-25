import React from 'react';

import { motion } from 'framer-motion';

import styles from './DashboardPage.module.css';



// --- ANIMATION VARIANTS (The "Movie Script" Logic) ---

const containerVariants = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: {

      staggerChildren: 0.15, // Delays each child by 0.15s for that "flow" effect

      delayChildren: 0.2

    }

  }

};



const itemVariants = {

  hidden: { opacity: 0, y: 20 }, // Starts slightly lower and invisible

  show: { 

    opacity: 1, 

    y: 0,

    transition: {

      type: "spring",

      stiffness: 50,

      damping: 20

    }

  }

};



const textRevealVariants = {

  hidden: { opacity: 0, y: 10 },

  show: { 

    opacity: 1, 

    y: 0,

    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }

  }

};



const CampaignsTab = ({ creator }) => {

  return (

    <motion.div 

      className={styles.tabContainer}

      variants={containerVariants}

      initial="hidden"

      animate="show"

    >

      

      {/* --- HEADER SECTION --- */}

      <motion.div variants={itemVariants} className={styles.tabHeader} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '3rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>

          <div>

            <motion.div 

              initial={{ opacity: 0, x: -10 }}

              animate={{ opacity: 1, x: 0 }}

              transition={{ delay: 0.5, duration: 0.8 }}

              style={{ 

                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', 

                color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1rem',

                display: 'flex', alignItems: 'center', gap: '0.5rem'

              }}

            >

              <span style={{ height: '1px', width: '20px', background: '#D4AF37' }}></span>

              Prepared for {creator?.username || 'Creator'}

            </motion.div>

            

            <h1 className={styles.pageTitle} style={{ maxWidth: '800px' }}>

              Face Set. <br/>

              <span style={{ color: '#78716C', fontStyle: 'italic' }}>Mind Set.</span>

            </h1>

          </div>

          

          <motion.button 

            whileHover={{ scale: 1.02, backgroundColor: '#1C1917', color: '#FFF' }}

            whileTap={{ scale: 0.98 }}

            className={styles.secondaryBtn}

          >

            Download Official Brief

          </motion.button>

        </div>

      </motion.div>





      <div className={styles.gridTwo} style={{ alignItems: 'start', marginTop: '4rem' }}>

        

        {/* --- LEFT COLUMN: THE NARRATIVE --- */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

          

          {/* THE VISION */}

          <motion.section variants={itemVariants}>

            <h3 className={styles.sectionTitle}>The Vision</h3>

            <motion.p 

              variants={textRevealVariants}

              style={{ 

                lineHeight: '1.6', color: '#1C1917', fontSize: '1.35rem', 

                fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem',

                borderLeft: '2px solid #D4AF37', paddingLeft: '1.5rem'

              }}

            >

              "Setting your face is an act of confidence that frees you to focus on your goals."

            </motion.p>

            <p style={{ lineHeight: '1.8', color: '#57534E', fontSize: '1rem' }}>

              We are speaking to the person who is <strong>unapologetically ambitious</strong>. 

              She values high-performance products that work as hard as she does. 

              This campaign isn't just about makeup; it's about the preparation for your moment.

            </p>

          </motion.section>



          {/* CONTENT PILLARS */}

          <motion.section variants={itemVariants}>

            <div className={styles.statLabel} style={{ marginBottom: '2rem' }}>Creative Execution</div>

            

            <div style={{ display: 'grid', gap: '1.5rem' }}>

              {[

                { 

                  id: "01", title: "The Armor Is On", 

                  desc: "An elevated 'Get Ready With Me.' Show the transition from bare face to full confidence." 

                },

                { 

                  id: "02", title: "The Unshakeable Test", 

                  desc: "Put the spray to a real-life test. Prove the 24HR wear claim in an ambitious setting." 

                },

                { 

                  id: "03", title: "The Confidence Ritual", 

                  desc: "A voiceover-led story about your mindset. ASMR focus on the spray sound and feel." 

                }

              ].map((item, i) => (

                <motion.div 

                  key={item.id}

                  whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.8)' }}

                  transition={{ type: 'spring', stiffness: 300 }}

                  className={styles.card}

                  style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'default' }}

                >

                  <span style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', color: '#D4AF37', opacity: 0.5 }}>{item.id}</span>

                  <div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1C1917', marginBottom: '0.5rem' }}>{item.title}</h4>

                    <p style={{ fontSize: '0.9rem', color: '#78716C', lineHeight: '1.6' }}>{item.desc}</p>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.section>

        </div>





        {/* --- RIGHT COLUMN: THE DETAILS --- */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          

          {/* DELIVERABLES */}

          <motion.div variants={itemVariants} className={styles.card} style={{ border: '1px solid #E5E5E5' }}>

            <h3 className={styles.sectionTitle} style={{ fontSize: '1.2rem' }}>The Mandatories</h3>

            

            <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F5F4', paddingBottom: '0.5rem' }}>

                <span style={{ fontSize: '0.85rem', color: '#78716C' }}>Initial Video</span>

                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1917' }}>1 x 45 Seconds</span>

              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F5F4', paddingBottom: '0.5rem' }}>

                <span style={{ fontSize: '0.85rem', color: '#78716C' }}>Ongoing</span>

                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1917' }}>1 Video / Week</span>

              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F5F4', paddingBottom: '0.5rem' }}>

                <span style={{ fontSize: '0.85rem', color: '#78716C' }}>Format</span>

                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1917' }}>9:16 Vertical HD</span>

              </li>

            </ul>



            <div style={{ fontSize: '0.75rem', color: '#A8A29E', lineHeight: '1.6', marginTop: '1.5rem' }}>

              <strong>Hashtags:</strong> #FaceSetMindSet #MilaniPartner #SetForSuccess #MakeItLastAllDay

            </div>

          </motion.div>



          {/* MOOD & TONE */}

          <motion.div variants={itemVariants} className={styles.card} style={{ backgroundColor: '#1C1917', color: '#FFFFFF' }}>

            <div className={styles.statLabel} style={{ color: '#A8A29E' }}>Mood & Vibe</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>

              {['Empowering', 'Authentic', 'Polished but Real', 'Energetic'].map((tag, i) => (

                <motion.span 

                  key={tag}

                  initial={{ opacity: 0, scale: 0.8 }}

                  animate={{ opacity: 1, scale: 1 }}

                  transition={{ delay: 1 + (i * 0.1) }}

                  style={{ 

                    padding: '0.5rem 1.25rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', 

                    fontSize: '0.75rem', color: '#E7E5E4', letterSpacing: '0.05em'

                  }}

                >

                  {tag}

                </motion.span>

              ))}

            </div>

          </motion.div>



          {/* VISUAL GUARDRAILS */}

          <motion.div variants={itemVariants} className={styles.card}>

             <div className={styles.statLabel}>Visual Guardrails</div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>

                <div>

                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', marginBottom: '1rem' }}>DO</div>

                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#57534E', lineHeight: '2' }}>

                    <li>✓ Natural Light</li>

                    <li>✓ Real Skin Texture</li>

                    <li>✓ Clean Backgrounds</li>

                  </ul>

                </div>

                <div>

                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#DC2626', marginBottom: '1rem' }}>DON'T</div>

                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#57534E', lineHeight: '2' }}>

                    <li>✗ Distorting Filters</li>

                    <li>✗ Competitor Logos</li>

                    <li>✗ Dark Footage</li>

                  </ul>

                </div>

             </div>

          </motion.div>



        </div>

      </div>

    </motion.div>

  );

};



export default CampaignsTab;