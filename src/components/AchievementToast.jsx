import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useJourney } from '../context/JourneyContext.jsx';

/**
 * يراقب قائمة الإنجازات المفتوحة حديثًا ويعرض إشعارًا احتفاليًا لكل إنجاز جديد.
 */
export default function AchievementToast() {
  const { unlockedAchievements, achievements } = useJourney();
  const [queue, setQueue] = useState([]);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    const fresh = unlockedAchievements.filter((id) => !seen.includes(id));
    if (fresh.length) {
      setQueue((q) => [...q, ...fresh]);
      setSeen((s) => [...s, ...fresh]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedAchievements]);

  useEffect(() => {
    if (!queue.length) return;
    const timer = setTimeout(() => setQueue((q) => q.slice(1)), 3200);
    return () => clearTimeout(timer);
  }, [queue]);

  const current = queue[0] ? achievements.find((a) => a.id === queue[0]) : null;

  return (
    <div className="fixed top-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-4">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="glass rounded-2xl px-5 py-3 shadow-glow flex items-center gap-3"
          >
            <span className="text-2xl animate-twinkle">{current.icon}</span>
            <div>
              <p className="font-display text-sm text-gold-500">إنجاز جديد</p>
              <p className="font-body font-semibold text-midnight-900">{current.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
