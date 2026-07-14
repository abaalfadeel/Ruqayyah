import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField.jsx';
import TypewriterText from '../components/TypewriterText.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { useAudio } from '../context/AudioContext.jsx';

const LINES = ['في هذا اليوم الجميل...', 'أهدي هذه الرحلة...', 'إلى أغلى أخت...'];

export default function IntroScene() {
  const [phase, setPhase] = useState('black'); // black -> sky -> lines -> ready
  const [lineIndex, setLineIndex] = useState(0);
  const { markIntroSeen } = useJourney();
  const { play } = useAudio();
  const navigate = useNavigate();

  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('sky');
      play('breeze', { volume: 0.25, loop: true });
      play('birds', { volume: 0.2 });
    }, 900);
    return () => clearTimeout(t1);
  }, [play]);

  React.useEffect(() => {
    if (phase === 'sky') {
      const t = setTimeout(() => setPhase('lines'), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleLineDone() {
    if (lineIndex < LINES.length - 1) {
      setLineIndex((i) => i + 1);
    } else {
      setPhase('ready');
    }
  }

  function handleContinue() {
    markIntroSeen();
    navigate('/gift');
  }

  return (
    <div className="relative w-full h-screen overflow-hidden night-sky">
      <AnimatePresence>
        {phase === 'black' && (
          <motion.div
            key="black"
            className="absolute inset-0 bg-black z-20"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {phase !== 'black' && (
        <>
          <ParticleField variant="stars" density={110} />
          {/* القمر */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 md:left-auto md:right-24 md:translate-x-0 w-24 h-24 rounded-full bg-gradient-to-br from-cream-50 to-gold-200 shadow-glow"
          />
          {/* سحب خفيفة */}
          <motion.div
            className="absolute bottom-24 -left-32 w-96 h-20 rounded-full bg-white/5 blur-2xl"
            animate={{ x: [0, 60, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-40 -right-40 w-[28rem] h-24 rounded-full bg-white/5 blur-2xl"
            animate={{ x: [0, -50, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* توهج شفقي خفيف (Aurora) */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blush-500/10 via-transparent to-transparent" />
        </>
      )}

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        {phase === 'lines' && (
          <TypewriterText
            key={lineIndex}
            text={LINES[lineIndex]}
            onDone={handleLineDone}
            className="font-display text-3xl md:text-5xl text-cream-50 text-glow text-center max-w-2xl"
          />
        )}

        {phase === 'ready' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl md:text-5xl text-cream-50 text-glow mb-8">
              رحلة إلى أجمل ذكرى ✨
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="px-10 py-4 rounded-full font-body font-semibold text-midnight-900 bg-gradient-to-l from-gold-300 to-blush-300 shadow-glow animate-glowPulse"
            >
              ابدئي الرحلة 🌙
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
