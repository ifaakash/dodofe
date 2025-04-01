import React, { useEffect, useRef, useState } from 'react';

const LandingPage = () => {
  const iframeRef = useRef(null);
  const [hasReloaded, setHasReloaded] = useState(false);

  // Always start from top
  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.scrollTo(0, 0);
    }
  };

  // Reload on Widht change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && !hasReloaded) {
        setHasReloaded(true);
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [hasReloaded]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        src="/landing/index.html"
        onLoad={handleLoad}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default LandingPage;
