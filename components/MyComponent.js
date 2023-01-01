import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

const MyComponent = ({ sources }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Find the default source in the array
    const defaultSource = sources.find((source) => source.quality === "default");

    // Initialize hls.js with the default source
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(defaultSource.url);
      hls.attachMedia(playerRef.current);

      return () => {
        // Destroy hls.js
        hls.destroy();
      };
    }
  }, [sources]);

  const handleQualityChange = (event) => {
    let selectedSource;

    // If the value is "auto", use the default source
    if (event.target.value === "default") {
      selectedSource = sources.find((source) => source.quality === "default");
    } else {
      // Otherwise, find the selected source in the array
      selectedSource = sources.find((source) => source.quality === event.target.value);
    }

    // Set the selected source as the source of the video player
    playerRef.current.src = selectedSource.url;
  };

  return (
    <div>
      {/* Create a select element with options for each source */}

      <video ref={playerRef} controls className='w-full h-full'></video>
      <select className='px-3 py-2 bg-base-100 rounded-3xl border-[2px] border-primary my-2' onChange={handleQualityChange} defaultValue="default">
        {sources.map((source) => (
          <option key={source.quality} value={source.quality}>{source.quality}</option>
        ))}
      </select>
    </div>
  );
};

export default MyComponent;
