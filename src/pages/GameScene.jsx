import React from 'react';
import { motion } from 'framer-motion';

// ملاحظة: هذا المشهد سيُستكمل بكامل ميزاته في الجزء التالي من التسليم —
// الجزء الحالي يغطي: المقدمة السينمائية، صندوق الهدية، المائدة، وخريطة الرحلة.
export default function GameScene() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl text-blush-600 text-center"
      >
        هذا الجزء من الرحلة قيد الإكمال — يصلكِ في الرسالة التالية ✨
      </motion.p>
    </div>
  );
}
