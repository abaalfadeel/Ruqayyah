import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * لوسي — شخصية أصلية بالكامل، قطة بعباءة وحجاب أسودين.
 * مرسومة بالكامل بأشكال SVG بسيطة (دوائر وأقواس) بأسلوب مسطح لطيف.
 * لا تعتمد على أي شخصية أو رسم معروف مسبقًا.
 *
 * expression: 'neutral' | 'happy' | 'laughing' | 'sad' | 'surprised' | 'wink'
 * wave: تشغّل تلويحة يد واحدة عند true
 * size: الحجم بالبكسل (افتراضي 240)
 */
export default function Lucy({ expression = 'neutral', wave = false, size = 240, className = '' }) {
  const [blink, setBlink] = useState(false);

  // رمش تلقائي عشوائي كل 2.5–5 ثوانٍ
  useEffect(() => {
    let timeout;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 2500;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 160);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const eyesClosed = blink || expression === 'laughing';

  return (
    <motion.svg
      viewBox="0 0 300 340"
      width={size}
      height={(size * 340) / 300}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="img"
      aria-label="لوسي القطة"
    >
      {/* الذيل — يتمايل بلطف باستمرار */}
      <motion.path
        d="M 235 250 Q 285 235 288 190 Q 291 150 260 145"
        stroke="#1C1620"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        animate={{ rotate: [0, 6, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '235px 250px' }}
      />

      {/* العباءة — الجسم */}
      <path
        d="M 150 160 C 95 160 65 210 62 268 C 60 300 80 320 150 320 C 220 320 240 300 238 268 C 235 210 205 160 150 160 Z"
        fill="#1C1620"
      />
      <path
        d="M 150 160 C 95 160 65 210 62 268 C 61 280 65 292 76 300 C 85 250 110 200 150 200 C 190 200 215 250 224 300 C 235 292 239 280 238 268 C 235 210 205 160 150 160 Z"
        fill="#241B2E"
        opacity="0.5"
      />

      {/* اليد اليسرى (ثابتة) */}
      <ellipse cx="88" cy="272" rx="16" ry="22" fill="#1C1620" />

      {/* اليد اليمنى (تلوّح عند wave=true) */}
      <motion.g
        style={{ transformOrigin: '214px 260px' }}
        animate={
          wave
            ? { rotate: [0, -25, 10, -20, 0] }
            : { rotate: 0 }
        }
        transition={wave ? { duration: 1.1, repeat: 1, ease: 'easeInOut' } : {}}
      >
        <ellipse cx="214" cy="260" rx="16" ry="22" fill="#1C1620" />
      </motion.g>

      {/* الحجاب — يغطي الرأس والكتفين */}
      <path
        d="M 150 55 C 100 55 68 95 68 140 C 68 165 78 180 92 192 C 85 165 92 140 110 128 C 105 150 108 172 122 186 C 150 200 150 200 178 186 C 192 172 195 150 190 128 C 208 140 215 165 208 192 C 222 180 232 165 232 140 C 232 95 200 55 150 55 Z"
        fill="#1C1620"
      />
      <path
        d="M 150 55 C 100 55 68 95 68 140 C 68 165 78 180 92 192 C 96 178 100 165 108 154 C 122 168 138 176 150 176 C 162 176 178 168 192 154 C 200 165 204 178 208 192 C 222 180 232 165 232 140 C 232 95 200 55 150 55 Z"
        fill="#2A2035"
        opacity="0.45"
      />

      {/* أذنا القطة تحت الحجاب — تتحرك بخفة */}
      <motion.path
        d="M 96 78 L 84 32 L 128 62 Z"
        fill="#1C1620"
        animate={{ rotate: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '96px 78px' }}
      />
      <motion.path
        d="M 204 78 L 216 32 L 172 62 Z"
        fill="#1C1620"
        animate={{ rotate: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        style={{ transformOrigin: '204px 78px' }}
      />
      <path d="M 96 78 L 90 52 L 112 68 Z" fill="#F4C4B8" />
      <path d="M 204 78 L 210 52 L 188 68 Z" fill="#F4C4B8" />

      {/* الوجه */}
      <ellipse cx="150" cy="140" rx="70" ry="64" fill="#F9E8DE" />

      {/* الخدود */}
      <ellipse cx="108" cy="160" rx="14" ry="9" fill="#F4C4B8" opacity="0.7" />
      <ellipse cx="192" cy="160" rx="14" ry="9" fill="#F4C4B8" opacity="0.7" />

      {/* العينان */}
      {!eyesClosed ? (
        <>
          <g>
            <ellipse cx="122" cy="136" rx="14" ry={expression === 'surprised' ? 18 : 16} fill="#241B2E" />
            <circle cx="126" cy="130" r="4.5" fill="#FFFDF9" />
          </g>
          {expression === 'wink' ? (
            <path d="M 158 138 Q 178 132 198 138" stroke="#241B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
          ) : (
            <g>
              <ellipse cx="178" cy="136" rx="14" ry={expression === 'surprised' ? 18 : 16} fill="#241B2E" />
              <circle cx="182" cy="130" r="4.5" fill="#FFFDF9" />
            </g>
          )}
        </>
      ) : (
        <>
          <path d="M 108 136 Q 122 144 136 136" stroke="#241B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 164 136 Q 178 144 192 136" stroke="#241B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* الأنف والشوارب */}
      <path d="M 150 152 L 144 160 L 156 160 Z" fill="#E58979" />
      <path d="M 60 148 L 96 152" stroke="#C9A98F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 60 160 L 96 160" stroke="#C9A98F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 240 148 L 204 152" stroke="#C9A98F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 240 160 L 204 160" stroke="#C9A98F" strokeWidth="2" strokeLinecap="round" />

      {/* الفم — يتغيّر حسب التعبير */}
      {expression === 'happy' || expression === 'laughing' ? (
        <path d="M 130 168 Q 150 188 170 168" stroke="#241B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : expression === 'sad' ? (
        <path d="M 130 178 Q 150 164 170 178" stroke="#241B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : expression === 'surprised' ? (
        <ellipse cx="150" cy="172" rx="7" ry="9" fill="#241B2E" />
      ) : (
        <path d="M 138 170 Q 150 176 162 170" stroke="#241B2E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
    </motion.svg>
  );
}
