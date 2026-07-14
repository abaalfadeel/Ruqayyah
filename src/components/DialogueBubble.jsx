import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * فقاعة حوار لطيفة لِلوسي — تدعم النص الظاهر تدريجيًا حرفًا حرفًا اختياريًا.
 */
export default function DialogueBubble({ text, tail = 'start', className = '' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -6 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`relative glass rounded-3xl px-6 py-4 shadow-soft max-w-sm ${className}`}
      >
        <p className="font-display text-lg md:text-xl leading-relaxed text-midnight-900">{text}</p>
        <span
          className={`absolute -bottom-2 ${tail === 'start' ? 'right-8' : 'left-8'} w-4 h-4 glass rotate-45 border-t-0 border-r-0`}
          aria-hidden="true"
        />
      </motion.div>
    </AnimatePresence>
  );
}
