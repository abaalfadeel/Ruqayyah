import React, { useEffect, useRef } from 'react';

/**
 * نظام جسيمات خفيف على Canvas — يدعم: نجوم متلألئة، يراعات، بتلات متساقطة.
 * variant: 'stars' | 'fireflies' | 'petals'
 * density: عدد الجسيمات (افتراضي مناسب للأداء)
 */
export default function ParticleField({ variant = 'stars', density = 80, className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    const palette = {
      stars: ['#FFFDF9', '#E4C486', '#F4C4B8'],
      fireflies: ['#F0D98C', '#EFA697'],
      petals: ['#F4C4B8', '#EFA697', '#FDEFEA']
    }[variant];

    function resize() {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function makeParticle() {
      const base = {
        x: Math.random() * width,
        y: Math.random() * height,
        r: (variant === 'petals' ? Math.random() * 4 + 3 : Math.random() * 1.6 + 0.6) * devicePixelRatio,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.6 + 0.3,
        vy:
          variant === 'petals'
            ? Math.random() * 0.4 + 0.25
            : variant === 'fireflies'
            ? (Math.random() - 0.5) * 0.3
            : 0,
        vx:
          variant === 'petals'
            ? (Math.random() - 0.5) * 0.5
            : variant === 'fireflies'
            ? (Math.random() - 0.5) * 0.3
            : 0,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02
      };
      return base;
    }

    function init() {
      resize();
      particles = Array.from({ length: density }, makeParticle);
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    let t = 0;
    function tick() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (variant === 'stars') {
          p.alpha = 0.35 + Math.abs(Math.sin(t * 0.8 + p.phase)) * 0.65;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (variant === 'fireflies') {
          p.x += p.vx;
          p.y += p.vy + Math.sin(t + p.phase) * 0.15;
          p.alpha = 0.3 + Math.abs(Math.sin(t * 1.4 + p.phase)) * 0.6;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 8 * devicePixelRatio;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        } else if (variant === 'petals') {
          p.y += p.vy * devicePixelRatio;
          p.x += p.vx * devicePixelRatio + Math.sin(t + p.phase) * 0.3;
          p.rot += p.vRot;
          drawPetal(p);
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        }
      }
      ctx.globalAlpha = 1;
      if (!prefersReduced) rafRef.current = requestAnimationFrame(tick);
    }

    init();
    tick();
    if (prefersReduced) {
      // ارسم إطارًا ثابتًا واحدًا فقط لمن يفضّلون تقليل الحركة
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        if (variant === 'petals') drawPetal(p);
        else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variant, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
