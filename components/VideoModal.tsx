
import React from 'react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass rounded-3xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Video Side */}
        <div className="w-full md:w-1/2 aspect-[9/16] md:h-full bg-black">
          <video 
            src={video.url} 
            controls 
            autoPlay 
            loop 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto bg-neutral-900/50">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-8">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Prompt</h3>
              <p className="text-xl font-light leading-relaxed text-white italic">
                "{video.prompt}"
              </p>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Process / Undervisning</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                  {video.description || "Ingen prosessbeskrivelse lagt til."}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest">
                <span>Created: {new Date(video.timestamp).toLocaleDateString('no-NO')}</span>
                <span>•</span>
                <span>Model: Gemini Veo 3.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
