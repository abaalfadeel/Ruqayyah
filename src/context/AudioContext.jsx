import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

// ضعي ملفات الصوت الفعلية داخل src/assets/audio/ بهذه الأسماء بالضبط
// جميعها مؤثرات طبيعية خفيفة جدًا فقط — لا موسيقى
const SOUND_FILES = {
  breeze: '/src/assets/audio/breeze.mp3',
  birds: '/src/assets/audio/birds.mp3',
  boxOpen: '/src/assets/audio/box-open.mp3',
  footsteps: '/src/assets/audio/footsteps.mp3',
  paper: '/src/assets/audio/paper.mp3',
  chime: '/src/assets/audio/chime.mp3',
  click: '/src/assets/audio/click.mp3'
};

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const poolRef = useRef({});

  const play = useCallback((name, { volume = 0.5, loop = false } = {}) => {
    if (mutedRef.current) return;
    const src = SOUND_FILES[name];
    if (!src) return;
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(() => {
        /* التشغيل التلقائي قد يُمنع قبل أول تفاعل من المستخدم — طبيعي وغير ضار */
      });
      if (loop) poolRef.current[name] = audio;
      return audio;
    } catch {
      return null;
    }
  }, []);

  const stop = useCallback((name) => {
    const audio = poolRef.current[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      delete poolRef.current[name];
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (next) Object.values(poolRef.current).forEach((a) => a.pause());
      return next;
    });
  }, []);

  return (
    <AudioContext.Provider value={{ play, stop, muted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio يجب أن يُستخدم داخل AudioProvider');
  return ctx;
}
