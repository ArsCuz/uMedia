
import React, { useState, useEffect } from 'react';
import { VideoItem } from './types';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';
import UploadView from './components/UploadView';

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'demo1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    prompt: 'A friendly giant rabbit in a mystical forest',
    description: 'Dette er en demo-video som viser hvordan formatet fungerer. I en undervisningskontekst ville vi her forklart valg av stilistiske elementer og lyssetting.',
    timestamp: Date.now() - 100000
  },
  {
    id: 'demo2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    prompt: 'Surreal clockwork machinery landscape',
    description: 'Fokus på industriell design og surrealisme. Her diskuterer vi hvordan AI tolker abstrakte mekaniske konsepter.',
    timestamp: Date.now() - 200000
  }
];

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('umedia_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isKeyCheckInProgress, setIsKeyCheckInProgress] = useState(true);

  useEffect(() => {
    localStorage.setItem('umedia_portfolio', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          // In a real environment, we'd prompt here.
          // For now we assume process.env.API_KEY is available or injected.
        }
      }
      setIsKeyCheckInProgress(false);
    };
    checkKey();
  }, []);

  const handleNewVideo = (video: VideoItem) => {
    setVideos(prev => [video, ...prev]);
    setShowUpload(false);
  };

  const handleOpenSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-black text-white selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter">uMedia.no</h1>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Non-Media Portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleOpenSelectKey}
              className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              API Settings
            </button>
            <button 
              onClick={() => setShowUpload(true)}
              className="bg-white text-black p-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={setSelectedVideo} 
            />
          ))}
          
          {/* Empty State / Add New Placeholder */}
          <button 
            onClick={() => setShowUpload(true)}
            className="aspect-[9/16] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group hover:border-white/20 transition-colors"
          >
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <svg className="w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium group-hover:text-white/40">Skap ny video</p>
          </button>
        </div>
      </main>

      {/* Mobile Sticky Add Button (Floating Action Button style) */}
      <div className="fixed bottom-8 right-8 z-40 sm:hidden">
         <button 
          onClick={() => setShowUpload(true)}
          className="bg-white text-black h-16 w-16 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5 text-center">
        <div className="space-y-4 max-w-lg mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium">uMedia Learning Platform</p>
          <p className="text-white/40 text-sm leading-relaxed font-light">
            En portefølje for eksperimentell AI-generert media. Designet for undervisning i moderne kreative prosesser. 
            Domene: umedia.no • Hosted på Cloudflare.
          </p>
          <div className="flex justify-center gap-6 pt-4">
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">Billing Info</a>
             <a href="#" className="text-[10px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-widest">About</a>
             <a href="#" className="text-[10px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-widest">Contact</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}

      {showUpload && (
        <UploadView 
          onSuccess={handleNewVideo}
          onCancel={() => setShowUpload(false)}
        />
      )}
    </div>
  );
};

export default App;
