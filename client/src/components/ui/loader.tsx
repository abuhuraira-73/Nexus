import React from 'react';
import './loader.css';

const Loader = ({ isFadingOut }) => {
  return (
    <div className={`flex items-center justify-center h-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1" />
          <span className="side side2" />
          <span className="side side3" />
          <span className="side side4" />
          <span className="shadow" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
