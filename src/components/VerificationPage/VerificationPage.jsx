import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam'; 
import styles from './VerificationPage.module.css';
import W9Form from './W9Form';

// --- ICONS ---
const ShieldIcon = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const IdCardIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>);
const CameraIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);
const CheckIcon = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const ClockIcon = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const VerificationPage = ({ onNavigate }) => {
  const [step, setStep] = useState('loading'); 
  const [captureType, setCaptureType] = useState('id_front');
  const [images, setImages] = useState({ id_front: null, id_back: null, selfie: null });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const webcamRef = useRef(null);

  // --- CHECK STATUS (Initial Load) ---
  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) { onNavigate('login'); return; }

      try {
        // We ensure a slight delay to allow any immediate token setting from login to sync.
        setTimeout(() => { 
            setStep('welcome'); 
        }, 800);
      } catch (err) {
          console.error("Status check failed:", err);
          setStep('welcome');
      }
    };
    checkStatus();
  }, [onNavigate]);

  // --- CAMERA LOGIC ---
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(prev => ({ ...prev, [captureType]: imageSrc })); 
    setStep('review');
  }, [webcamRef, captureType]);

  const handleRetake = () => {
    setImages(prev => ({ ...prev, [captureType]: null }));
    setStep(captureType); 
  };

  const handleConfirm = () => {
    if (captureType === 'id_front') {
      setCaptureType('id_back');
      setStep('id_back'); 
    } else if (captureType === 'id_back') {
      setCaptureType('selfie');
      setStep('selfie'); 
    } else if (captureType === 'selfie') {
      setStep('w9'); 
    }
  };

  const handleW9Submit = (data) => {
      submitVerification(data); 
  };

  const submitVerification = async (finalW9Data) => {
    setStep('processing');
    // Clear previous status, set loading status
    setSubmissionStatus({ message: 'Encrypting data and submitting to server...', type: 'info' });
    
    // --- AUTH FIX: Retrieve token immediately before the request ---
    const token = localStorage.getItem('accessToken');
    if (!token) { 
        setSubmissionStatus({ message: "Authentication token missing. Logging out...", type: 'error' });
        onNavigate('login'); 
        return; 
    }

    const submissionData = {
        id_front: images.id_front,
        id_back: images.id_back,
        selfie: images.selfie,
        w9: finalW9Data
    };

    try {
        const response = await fetch(`${API_URL}/api/profile/verify/`, {
            method: 'POST',
            headers: {
                // --- CRITICAL HEADER ---
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData),
        });

        if (response.ok) {
            const data = await response.json();
            setSubmissionStatus({ message: data.message, type: 'success' });
            setStep('pending_view');
        } else if (response.status === 401) {
            // Explicitly handle 401: Token invalid/expired
            localStorage.removeItem('accessToken');
            setSubmissionStatus({ message: "Session expired. Please log in again.", type: 'error' });
            setTimeout(() => onNavigate('login'), 1000);
        } else {
            // Handle other server errors (e.g., 400 Bad Request, 500 Internal Error)
            const errorData = await response.json().catch(() => ({})); 
            console.error("Verification failed:", response.status, errorData);
            setSubmissionStatus({ message: errorData.message || errorData.detail || `Server error (${response.status}).`, type: 'error' });
            setStep('w9'); // Revert to W9 to show the error
        }
    } catch (error) {
        // Network error (e.g., backend completely down)
        console.error("API call error:", error);
        setSubmissionStatus({ message: 'Network connection failed. Check console for details.', type: 'error' });
        setStep('w9'); // Revert to W9 to show the error
    }
  };

  // --- RENDERS ---
  const renderLoading = () => (
      <div className={styles.centerContent}><div className={styles.spinner}></div></div>
  );

  const renderWelcome = () => (
    <div className={styles.centerContent}>
      <div className={styles.iconRing}><ShieldIcon /></div>
      <h1 className={styles.pageTitle}>Identity Verification</h1>
      <p className={styles.pageSubtitle}>To ensure the safety of our exclusive community, we require a government-issued ID and a quick selfie.</p>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.smallIcon}><IdCardIcon /></div>
          <div><h4>Government ID</h4><p>Driver's license, passport, or national ID.</p></div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.smallIcon}><CameraIcon /></div>
          <div><h4>Live Selfie</h4><p>We match this to your ID photo.</p></div>
        </div>
      </div>
      <button className={styles.primaryBtn} onClick={() => { setStep('id_front'); setCaptureType('id_front'); }}>Begin Verification</button>
    </div>
  );

  const renderCamera = (title, instruction, overlayType) => (
    <div className={styles.centerContent}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.instruction}>{instruction}</p>
      
      <div className={styles.cameraFrame}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={styles.video}
          videoConstraints={{ facingMode: captureType === 'selfie' ? "user" : "environment" }}
        />
        
        <div className={styles.overlay}>
           {/* ID CARD OVERLAY (FRONT vs BACK CUES) */}
           {overlayType === 'card' && (
             <div className={styles.idGuide}>
                {captureType === 'id_front' ? (
                  // Visual cues for FRONT (Photo left, lines right)
                  <div className={styles.ghostFront}>
                    <div className={styles.ghostPhoto}></div>
                    <div className={styles.ghostLines}>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                ) : (
                  // Visual cues for BACK (Barcode top, lines bottom)
                  <div className={styles.ghostBack}>
                    <div className={styles.ghostBar}></div>
                    <div className={styles.ghostLines}>
                      <span></span><span></span>
                    </div>
                  </div>
                )}
             </div>
           )}
           
           {/* SELFIE OVERLAY */}
           {overlayType === 'selfie' && (
             <div className={styles.selfieGuide}>
               <div className={styles.faceOval}></div>
               <div className={styles.idHandGuide}>Hold ID Under Chin</div> 
             </div>
           )}
        </div>
      </div>
      
      <button className={styles.shutterBtn} onClick={capture}></button>
    </div>
  );

  const renderReview = () => (
    <div className={styles.centerContent}>
      <h2 className={styles.sectionTitle}>Review Photo</h2>
      <p className={styles.instruction}>Ensure text is readable and lighting is clear.</p>
      <div className={styles.reviewFrame}>
        <img src={images[captureType]} alt="Review" className={styles.reviewImg} />
      </div>
      <div className={styles.actionRow}>
        <button className={styles.secondaryBtn} onClick={handleRetake}>Retake</button>
        <button className={styles.primaryBtn} onClick={handleConfirm}>
            {captureType === 'selfie' ? 'Continue to W9' : 'Confirm Photo'}
        </button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className={styles.centerContent}>
        <div className={styles.spinner}></div>
        <h3 className={styles.processingTitle}>Securing Data...</h3>
        <p className={styles.instruction}>Encrypting your documents and submitting to API.</p>
        {submissionStatus?.message && (
             <p style={{ 
                 color: submissionStatus.type === 'error' ? '#DC2626' : '#57534E', 
                 fontSize: '0.8rem', 
                 marginTop: '1rem',
                 fontWeight: submissionStatus.type === 'error' ? 600 : 400
             }}>
                 {submissionStatus.message}
             </p>
        )}
    </div>
  );

  const renderPending = () => (
    <div className={styles.centerContent}>
        <div className={styles.iconRing} style={{ borderColor: '#C5A059', color: '#C5A059' }}><ClockIcon /></div>
        <h1 className={styles.pageTitle}>Under Review</h1>
        <p className={styles.pageSubtitle}>Your documents have been securely received. Our team will verify your identity within 24 hours.</p>
        <div className={styles.statusBadge}><span>Status: <strong>Pending</strong></span></div>
        <button onClick={() => onNavigate('dashboard')} className={styles.secondaryBtn}>Return to Dashboard</button>
    </div>
  );

  const renderVerified = () => (
    <div className={styles.centerContent}>
        <div className={styles.iconRing} style={{ borderColor: '#059669', color: '#059669' }}><CheckIcon /></div>
        <h1 className={styles.pageTitle}>Verified</h1>
        <p className={styles.pageSubtitle}>Your identity is confirmed.</p>
        <button onClick={() => onNavigate('dashboard')} className={styles.primaryBtn}>Go to Campaigns</button>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
            <span className={styles.brand}>MILANI SECURE</span>
            <button className={styles.closeBtn} onClick={() => onNavigate('dashboard')}>✕</button>
        </div>
        <div className={styles.modalBody}>
          {step === 'loading' && renderLoading()}
          {step === 'welcome' && renderWelcome()}
          {step === 'id_front' && renderCamera("Front of ID", "Position the front of your ID in the frame.", 'card')}
          {step === 'id_back' && renderCamera("Back of ID", "Position the back of your ID in the frame.", 'card')}
          {step === 'selfie' && renderCamera("Live Selfie", "Center your face. Hold ID under chin.", 'selfie')}
          {step === 'review' && renderReview()}
          {/* Pass submissionStatus to W9 form for potential inline error messages */}
          {step === 'w9' && <W9Form onSubmit={handleW9Submit} submissionStatus={submissionStatus} />} 
          {step === 'processing' && renderProcessing()}
          {step === 'pending_view' && renderPending()}
          {step === 'verified_view' && renderVerified()}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;