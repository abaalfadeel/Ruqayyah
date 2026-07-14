// تعريف مراحل الرحلة — مصدر واحد للحقيقة تُستخدم في الخريطة والتوجيه ونظام الإنجازات
export const STAGES = [
  { id: 'table', icon: '🍚', title: 'المائدة', path: '/table' },
  { id: 'camera', icon: '📷', title: 'كاميرا الذكريات', path: '/camera' },
  { id: 'wishes', icon: '⭐', title: 'نجمة الأمنيات', path: '/wishes' },
  { id: 'letters', icon: '💌', title: 'الرسائل', path: '/letters' },
  { id: 'game', icon: '🎮', title: 'لعبة لوسي', path: '/game' },
  { id: 'photos', icon: '📸', title: 'صندوق الصور', path: '/photos' },
  { id: 'finalGift', icon: '🎁', title: 'الهدية الأخيرة', path: '/final-gift' }
];

export const ACHIEVEMENTS = [
  { id: 'firstGift', icon: '🌟', title: 'أول هدية', description: 'فتحتِ صندوق الهدية الأول' },
  { id: 'firstLetter', icon: '🌟', title: 'أول رسالة', description: 'قرأتِ أول رسالة تشجيعية' },
  { id: 'gameFinished', icon: '🌟', title: 'إنهاء اللعبة', description: 'وصلتِ إلى 30 نقطة مع لوسي' },
  { id: 'allWishes', icon: '🌟', title: 'جمع جميع النجوم', description: 'أرسلتِ أمنياتك إلى السماء' },
  { id: 'journeyComplete', icon: '🌟', title: 'إنهاء الرحلة', description: 'أكملتِ رحلة أجمل ذكرى بالكامل' }
];
