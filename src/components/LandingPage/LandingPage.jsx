import React, { useState } from 'react';

const LandingPage = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // VIMEO LINK
  // background=1: Removes controls, loops, mutes.
  const vimeoSrc = "https://player.vimeo.com/video/962959283?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1";

  return (
    <div className="landing-page-wrapper">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-grid">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="text-column">
          <div className="badge-wrapper">
            <span className="badge-line"></span>
            <span className="badge-text">Campaign 2025</span>
          </div>
          
          <h1 className="headline">
            <span className="line-bold">FACE SET.</span>
            <span className="line-serif">MIND SET.</span>
          </h1>
          
          <p className="subhead">
            Preparation is power. The exclusive portal for creators who define the standard.
          </p>
          
          <div className="cta-group">
            <button 
              onClick={() => onNavigate('login')} 
              className="btn-primary"
            >
              <span>Enter Portal</span>
            </button>
            
            <button 
              onClick={() => onNavigate('about')} 
              className="btn-secondary"
            >
              The Brief
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: VIDEO */}
        <div className="visual-column">
           
           <div className="visual-content">
             
             {/* VIDEO WRAPPER */}
             <div className="video-wrapper">
               <iframe
                src={vimeoSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Campaign Hero"
                onLoad={() => setIsLoaded(true)}
                className={`vimeo-iframe ${isLoaded ? 'loaded' : ''}`}
               />
             </div>

             {/* GRAIN OVERLAY (Texture) */}
             <div className="grain-overlay"></div>
             
           </div>

           {/* FRAME BORDER */}
           <div className="visual-frame"></div>

           {/* LABEL */}
           <div className="floating-label">
             Milani Cosmetics
           </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-group">
             <span className="marquee-item">Unapologetically Ambitious</span>
             <span className="marquee-dot"></span>
             <span className="marquee-item">Polished But Real</span>
             <span className="marquee-dot"></span>
          </div>
          <div className="marquee-group">
             <span className="marquee-item">Make It Last</span>
             <span className="marquee-dot"></span>
             <span className="marquee-item">Up To 24HR Wear</span>
             <span className="marquee-dot"></span>
          </div>
        </div>
      </section>

      
      {/* --- INTERNAL STYLES --- */}
      <style>{`
        /* --- VARIABLES & FONTS --- */
        .landing-page-wrapper {
          width: 100%;
          min-height: 100vh;
          padding-top: 80px;
          background-color: #FAFAF9;
          color: #1C1917;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        /* --- HERO LAYOUT (Grid) --- */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr; /* Mobile: 1 column */
          gap: 3rem;
          padding: 2rem 1.5rem;
          max-width: 1600px;
          margin: 0 auto;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr; /* Desktop: 2 Equal Columns */
            gap: 5rem;
            padding: 4rem 5rem;
            align-items: center; /* Center vertically */
            min-height: 600px; /* Force height on desktop */
            height: calc(100vh - 140px);
          }
        }

        /* --- LEFT COLUMN (Text) --- */
        .text-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          z-index: 10;
          width: 100%;
        }

        /* --- RIGHT COLUMN (Video) --- */
        .visual-column {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* THE CONTENT BOX (Forces 16:9 Ratio) */
        .visual-content {
          width: 100%;
          aspect-ratio: 16 / 9; /* FORCE RECTANGLE SHAPE */
          position: relative;
          z-index: 10;
          background-color: #E5E5E5;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .vimeo-iframe {
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          pointer-events: none;
        }
        .vimeo-iframe.loaded { opacity: 1; }

        .grain-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.12;
          mix-blend-mode: overlay;
        }

        /* DECORATIVE FRAME */
        .visual-frame {
          position: absolute;
          top: -1rem; bottom: -1rem; left: -1rem; right: -1rem;
          border: 1px solid #D6D3D1;
          z-index: 0;
          pointer-events: none;
        }

        .floating-label {
          position: absolute;
          bottom: -1.5rem;
          left: -1.5rem;
          background-color: #C5A059;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.5rem 1.5rem;
          z-index: 20;
          box-shadow: 0 5px 15px rgba(197, 160, 89, 0.3);
        }

        /* --- TYPOGRAPHY --- */
        .badge-wrapper { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .badge-line { height: 1px; width: 30px; background-color: #1C1917; }
        .badge-text { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #1C1917; }

        .headline { font-size: 3.5rem; line-height: 0.95; color: #1C1917; margin-bottom: 2rem; letter-spacing: -0.02em; }
        @media (min-width: 768px) { .headline { font-size: 5.5rem; } }
        @media (min-width: 1280px) { .headline { font-size: 7rem; } }

        .line-bold { font-weight: 800; display: block; }
        .line-serif { font-family: 'Playfair Display', serif; font-weight: 300; font-style: italic; display: block; margin-top: 0.1em; }

        .subhead { font-size: 1.125rem; line-height: 1.6; color: #57534E; max-width: 460px; margin-bottom: 3rem; }

        /* --- BUTTONS --- */
        .cta-group { display: flex; flex-direction: column; width: 100%; gap: 1.25rem; }
        @media (min-width: 640px) { .cta-group { flex-direction: row; width: auto; } }

        .btn-primary { background-color: #1C1917; color: #FAFAF9; padding: 1rem 2.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; border: 1px solid #1C1917; cursor: pointer; transition: 0.3s; }
        .btn-primary:hover { background-color: #C5A059; border-color: #C5A059; transform: translateY(-1px); }

        .btn-secondary { background-color: transparent; color: #1C1917; padding: 1rem 2.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; border: 1px solid #1C1917; cursor: pointer; transition: 0.3s; }
        .btn-secondary:hover { background-color: #1C1917; color: #FAFAF9; }

        /* --- MARQUEE --- */
        .marquee-section { border-top: 1px solid #E7E5E0; border-bottom: 1px solid #E7E5E0; padding: 1.5rem 0; overflow: hidden; white-space: nowrap; background-color: #FAFAF9; }
        .marquee-track { display: inline-flex; animation: marquee 60s linear infinite; }
        .marquee-group { display: flex; align-items: center; }
        .marquee-item { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #1C1917; padding: 0 3rem; }
        .marquee-dot { height: 4px; width: 4px; background-color: #C5A059; border-radius: 50%; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
      `}</style>
      
    </div>
  );
};

export default LandingPage;