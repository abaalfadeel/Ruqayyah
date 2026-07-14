import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField.jsx';
import { useJourney } from '../context/JourneyContext.jsx';

export default function JourneyMap() {
  const { stages, completedStages, isStageUnlocked } = useJourney();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream-100 via-blush-50 to-cream-50 px-6 py-20 overflow-hidden">
      <ParticleField variant="fireflies" density={30} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="font-display text-3xl md:text-4xl text-blush-600 mb-3">خريطة الرحلة</h1>
        <p className="font-body text-midnight-800/70 mb-12">اختاري محطتكِ التالية 🌷</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {stages.map((stage, i) => {
            const done = completedStages.includes(stage.id);
            const unlocked = isStageUnlocked(stage.id);
            return (
              <motion.button
                key={stage.id}
                disabled={!unlocked}
                onClick={() => navigate(stage.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={unlocked ? { scale: 1.06, y: -4 } : {}}
                whileTap={unlocked ? { scale: 0.95 } : {}}
                className={`relative rounded-3xl p-6 flex flex-col items-center gap-3 shadow-soft transition-colors ${
                  done
                    ? 'glass border-2 border-gold-300'
                    : unlocked
                    ? 'glass'
                    : 'bg-cream-100/60 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className={`text-4xl ${done ? 'animate-twinkle' : ''}`}>
                  {unlocked ? stage.icon : '🔒'}
                </span>
                <span className="font-body font-semibold text-midnight-900">{stage.title}</span>
                {done && <span className="text-xs text-gold-500 font-semibold">مكتملة ✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
