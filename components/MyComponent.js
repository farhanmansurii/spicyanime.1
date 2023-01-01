import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

const MyComponent = ({ sources }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const defaultSource = sources?.find((source) => source.quality === "default");

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(defaultSource?.url);
      hls.attachMedia(playerRef.current);

      return () => {
        hls.destroy();
      };
    }
  }, [sources]);

  const handleQualityChange = (event) => {
    let selectedSource;

    if (event.target.value === "default") {
      selectedSource = sources.find((source) => source.quality === "default");
    } else {
      selectedSource = sources?.find((source) => source?.quality === event.target.value);
    }

    playerRef.current.src = selectedSource?.url;
  };

  return (
    <div>

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
