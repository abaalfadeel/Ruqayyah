import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * يعرض النص حرفًا حرفًا، ثم يستدعي onDone بعد مهلة عرض.
 */
export default function TypewriterText({
  text,
  speed = 55,
  holdMs = 1400,
  onDone,
  className = ''
}) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        if (onDone) setTimeout(onDone, holdMs);
      }
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {shown}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[1em] bg-gold-300 align-middle mr-1"
        aria-hidden="true"
      />
    </motion.p>
  );
}
