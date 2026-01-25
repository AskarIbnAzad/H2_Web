import React, { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Tawk.to integration
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/682f43431446f1b5f31dce78/1irs9tg5v';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    s0.parentNode.insertBefore(s1, s0);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      if (s1 && s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything visible
};

export default TawkToChat;