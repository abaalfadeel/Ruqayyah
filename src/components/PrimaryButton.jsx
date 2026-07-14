import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext.jsx';

export default function PrimaryButton({ children, onClick, className = '', sound = 'click', ...rest }) {
  const { play } = useAudio();
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={(e) => {
        if (sound) play(sound, { volume: 0.35 });
        onClick?.(e);
      }}
      className={`px-8 py-3.5 rounded-full font-body font-semibold text-cream-50 bg-gradient-to-l from-blush-500 to-gold-400 shadow-soft hover:shadow-glow transition-shadow duration-300 ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
