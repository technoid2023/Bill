import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress +100;
      });
    }, 1000); // Progress update interval in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen-container" style={{
      margin:'15rem'
    }}>
      <ProgressBar now={progress} label={`${progress}%`} />
    </div>
  );
}

export default LoadingScreen;
