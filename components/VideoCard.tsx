
import React, { useRef, useState } from 'react';
import { VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="relative aspect-[9/16] group cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/20 active:scale-95"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(video)}
    >
      <video
        ref={videoRef}
        src={video.url}
        muted
        loop
        playsInline
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-medium text-white/90 line-clamp-1">{video.prompt}</p>
          <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest">uMedia #{(video.id.slice(0, 4))}</p>
        </div>
      </div>
      
      {/* Play Indicator */}
      {!isHovering && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10">
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
