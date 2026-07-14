import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lucy from '../components/Lucy.jsx';
import DialogueBubble from '../components/DialogueBubble.jsx';
import ParticleField from '../components/ParticleField.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { useAudio } from '../context/AudioContext.jsx';

export default function GiftBoxScene() {
  const [stage, setStage] = useState('welcome'); // welcome -> box -> shaking -> opened
  const { openFirstGift } = useJourney();
  const { play } = useAudio();
  const navigate = useNavigate();

  function handleOpen() {
    setStage('shaking');
    play('boxOpen', { volume: 0.4 });
    setTimeout(() => setStage('opened'), 900);
    setTimeout(() => openFirstGift(), 1500);
  }

  return (
    <div className="relative w-full min-h-screen night-sky flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <ParticleField variant="stars" density={70} />

      {stage === 'welcome' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center gap-6 text-center"
        >
          <Lucy expression="happy" wave size={220} />
          <DialogueBubble text="أهلًا وسهلًا بيكِ 🤍 اليوم رحلة خاصة جدًا إلكِ." />
          <PrimaryButton onClick={() => setStage('box')} className="mt-4">
            يلا نكمل ✨
          </PrimaryButton>
        </motion.div>
      )}

      {stage !== 'welcome' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center gap-8 text-center"
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
            <AnimatePresence>
              {stage !== 'opened' && (
                <motion.div
                  key="box"
                  animate={
                    stage === 'shaking'
                      ? { rotate: [0, -6, 6, -6, 6, 0], transition: { duration: 0.8 } }
                      : { y: [0, -10, 0], transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }
                  }
                  exit={{ scale: 1.4, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <GiftBoxSVG />
                </motion.div>
              )}
            </AnimatePresence>

            {stage === 'opened' && (
              <>
                <BurstParticles />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.2 }}
                  className="text-7xl"
                >
                  💝
                </motion.div>
              </>
            )}
          </div>

          {stage === 'box' && (
            <PrimaryButton onClick={handleOpen}>افتحي الهدية 🎁</PrimaryButton>
          )}

          {stage === 'opened' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="font-display text-2xl text-cream-50 text-glow">
                فرحة صغيرة قبل ما نبدأ 🌸
              </p>
              <PrimaryButton onClick={() => navigate('/table')}>هيا بنا 🍚</PrimaryButton>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function GiftBoxSVG() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label="صندوق هدية">
      <rect x="30" y="80" width="140" height="100" rx="8" fill="#E58979" />
      <rect x="30" y="80" width="140" height="26" fill="#D06B5C" />
      <rect x="90" y="80" width="20" height="100" fill="#EFDBAE" />
      <rect x="30" y="80" width="140" height="20" fill="#EFDBAE" opacity="0.85" />
      <path d="M100 80 C 70 40 40 55 55 78 C 70 92 100 85 100 80 Z" fill="#F4C4B8" />
      <path d="M100 80 C 130 40 160 55 145 78 C 130 92 100 85 100 80 Z" fill="#F4C4B8" />
      <circle cx="100" cy="80" r="10" fill="#E4C486" />
    </svg>
  );
}

function BurstParticles() {
  const items = Array.from({ length: 18 });
  const glyphs = ['🌸', '⭐', '💗', '✨'];
  return (
    <>
      {items.map((_, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const distance = 90 + Math.random() * 40;
        return (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance - 20,
              opacity: 0,
              scale: 1.1
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            {glyphs[i % glyphs.length]}
          </motion.span>
        );
      })}
    </>
  );
}
