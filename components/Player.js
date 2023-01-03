import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ sources, handleVideoEnd }) => {
  const [selectedUrl, setSelectedUrl] = useState(null)
  const [progress, setProgress] = useState(0);
  const handleProgress = (progress) => {
    (Math.round(progress.played * 100));
  }
  const handleQualityChange = (url) => {
    setSelectedUrl(url)
  }

  useEffect(() => {
    const defaultVideo = sources.find((video) => video.quality === 'default')
    if (defaultVideo) {
      setSelectedUrl(defaultVideo.url)
    }
  }, [])

  return (
    <div>
      <div className='gap-1 flex py-1  flex-wrap place-content-center'>
        {sources.map((video) => (
          <button
            onClick={() => handleQualityChange(video.url)} key={video.url}
            className={`${selectedUrl === video.url ? 'bg-secondary-focus text-primary border-2 border-primary' : 'bg-secondary text-primary'}  rounded-full  px-3 py-2  text-xs`}
          >     {video.quality}
          </button>
        ))}
      </div>
      {selectedUrl && (
        <ReactPlayer
          onEnded={handleVideoEnd}
          url={selectedUrl}
          controls width={'100%'} height={'100%'}
        />
      )}
    </div>
  )
}

export default Player
