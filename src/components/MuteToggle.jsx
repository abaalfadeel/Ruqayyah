import React from 'react';
import { useAudio } from '../context/AudioContext.jsx';

export default function MuteToggle() {
  const { muted, toggleMute } = useAudio();
  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
      className="fixed bottom-5 left-5 z-[100] w-11 h-11 rounded-full glass shadow-soft flex items-center justify-center text-lg"
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
