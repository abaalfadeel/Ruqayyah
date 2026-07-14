import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lucy from '../components/Lucy.jsx';
import DialogueBubble from '../components/DialogueBubble.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ParticleField from '../components/ParticleField.jsx';
import { useJourney } from '../context/JourneyContext.jsx';

const DIALOGUE = [
  { text: 'هاي أول لقمة إلكِ 🍚🤍', expression: 'happy' },
  { text: 'هسه إجا دوري 😋', expression: 'laughing' },
  { text: 'هل أنتِ مستعدة لبقية المفاجآت؟', expression: 'neutral' }
];

export default function TableScene() {
  const [step, setStep] = useState(0);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noGone, setNoGone] = useState(false);
  const noRef = useRef(null);
  const { completeStage } = useJourney();
  const navigate = useNavigate();

  const showQuestion = step >= DIALOGUE.length - 1;

  function nextLine() {
    if (step < DIALOGUE.length - 1) setStep((s) => s + 1);
  }

  function handleYes() {
    completeStage('table');
    navigate('/map');
  }

  function dodgeNo() {
    if (dodgeCount >= 4) {
      setNoGone(true);
      return;
    }
    const dx = (Math.random() - 0.5) * 260;
    const dy = (Math.random() - 0.5) * 140;
    setNoPos({ x: dx, y: dy });
    setDodgeCount((c) => c + 1);
  }

  const current = DIALOGUE[step];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-blush-100 via-cream-100 to-cream-50 flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <ParticleField variant="petals" density={22} className="opacity-70" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full">
        <TableSVG />

        <Lucy expression={current.expression} size={180} />

        {!noGone ? (
          <div onClick={step === DIALOGUE.length - 1 ? undefined : nextLine} className="cursor-pointer">
            <DialogueBubble text={current.text} />
          </div>
        ) : (
          <DialogueBubble text="لا مفر 😸" />
        )}

        {!showQuestion && (
          <PrimaryButton onClick={nextLine} sound={null}>
            التالي
          </PrimaryButton>
        )}

        {showQuestion && !noGone && (
          <div className="relative flex items-center gap-6 h-16">
            <PrimaryButton onClick={handleYes}>نعم 🤍</PrimaryButton>
            <motion.button
              ref={noRef}
              onMouseEnter={dodgeNo}
              onClick={dodgeNo}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="px-8 py-3.5 rounded-full font-body font-semibold text-blush-600 border-2 border-blush-300 bg-cream-50"
            >
              لا
            </motion.button>
          </div>
        )}

        {showQuestion && noGone && (
          <PrimaryButton onClick={handleYes}>نكمل الرحلة ✨</PrimaryButton>
        )}
      </div>
    </div>
  );
}

function TableSVG() {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="auto" className="max-w-xs" role="img" aria-label="مائدة طعام">
      <ellipse cx="160" cy="150" rx="150" ry="20" fill="#E9C9A6" />
      <rect x="60" y="90" width="200" height="60" rx="10" fill="#FFFDF9" stroke="#F4C4B8" strokeWidth="3" />
      {/* صحن التمن والقيمة */}
      <ellipse cx="120" cy="110" rx="34" ry="14" fill="#FFFFFF" stroke="#E9C9A6" strokeWidth="2" />
      <ellipse cx="120" cy="106" rx="26" ry="9" fill="#F6E7B0" />
      <circle cx="120" cy="102" r="7" fill="#D06B5C" />
      {/* شمعة */}
      <rect x="205" y="70" width="10" height="30" rx="3" fill="#F9E8DE" />
      <motion.ellipse
        cx="210"
        cy="65"
        rx="5"
        ry="9"
        fill="#EFA697"
        animate={{ opacity: [0.7, 1, 0.7], scaleY: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}
