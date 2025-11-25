import React, { useState } from 'react';

const FashionHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // VIMEO CONFIGURATION
  const vimeoSrc = "https://player.vimeo.com/video/962959283?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1";

  return (
    // ROOT CONTAINER:
    // We use 100% width/height relative to the parent (.visualContent in LandingPage)
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        backgroundColor: '#E5E5E5',
      }}
    >
      
      {/* --- VIMEO EMBED WRAPPER --- */}
      {/* transform: scale(1.5) zooms in to emulate object-fit: cover behavior for iframes */}
      {/* centering ensures it crops evenly from the center */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%) scale(1.5)', 
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <iframe
          src={vimeoSrc}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Campaign Hero"
          onLoad={() => setIsLoaded(true)}
          style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             opacity: isLoaded ? 1 : 0,
             transition: 'opacity 1.5s ease-in-out'
          }}
        ></iframe>
      </div>

      {/* --- GRAIN OVERLAY (Texture) --- */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          opacity: 0.12, 
          mixBlendMode: 'overlay'
        }}
      ></div>

      {/* --- TINT (Cinematic) --- */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20,
          backgroundColor: '#1C1917',
          opacity: 0.05,
          mixBlendMode: 'multiply'
        }}
      ></div>

    </div>
  );
};

export default FashionHero;