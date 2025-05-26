import React, { useEffect, useRef, useState } from 'react';
import dodoLogo from "public/icons/dodo.svg";
import MetaData from '@components/molecules/MetaData';
import FloatingBar from '@components/templates/Landing/FloatingBar';


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

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const floatingBar: any = document.querySelector('.floating-bar');
    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = iframe.contentWindow.pageYOffset || iframe.contentWindow.document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        floatingBar.style.bottom = '-60px'; // Hide the bar
      } else {
        // Scrolling up
        floatingBar.style.bottom = '-60px'; // Hide the bar
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

      // Show the bar when scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        floatingBar.style.bottom = '10px'; // Show the bar
      }, 150); // Adjust the timeout duration as needed
    };

    iframe.contentWindow.addEventListener('scroll', handleScroll);

    return () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <MetaData
        title="Dodo — The Ultimate Link-in-Bio + Invoices + Media Kit Tool for Influencers"
        description="Dodo helps influencers create stunning bio pages, manage brand invoices, generate scripts, and showcase a media kit — all in one flashy platform designed for Gen Z."
        keywords="link in bio, influencer tools, Gen Z creator tools, social media toolkit, media kit generator, invoice creator, script generator, brand deals, bio page builder, creator landing page, custom themes, monetization, creator portfolio"
        url="https://dodoclub.in"
        image={dodoLogo}
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Dodo",
          "url": "https://dodoclub.in",
          "description": "The Ultimate Link-in-Bio + Invoices + Media Kit Tool for Influencers",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://dodoclub.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <div className='flex justify-center items-center'>
        <FloatingBar />
      </div>

      <iframe
        ref={iframeRef}
        src="/landing/index.html"
        onLoad={handleLoad}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div >
  );
};

export default LandingPage;
