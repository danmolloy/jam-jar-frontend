'use client';
import React from 'react';
import { useInView } from 'framer-motion';

export const words = [
  'intonation',
  'rhythm',
  'pulse',
  'tuning',
  'phrasing',
  'tone',
  'dynamics',
  'contact',
  'listen',
  'piano',
  'excerpts',
  'concerto',
  'control',
  'singing',
  'dolce',
  'technical',
  'scales',
  'fingering',
  'bowing',
  'breathe',
  'centering',
  'memory',
  'mock',
  'recital',
];

// Deterministic pseudo-random generator so SSR and client render match
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function TagsPreview() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className=" relative  flex justify-center p-6">
      <div
        className="grid gap-1 max-w-sm lg:max-w-md relative"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
      >
        {words.map((word, i) => {
          const size = ['text-xs', 'text-sm', 'text-base', 'text-lg'][i % 4];
          const seed = i + 1;
          const rotate = pseudoRandom(seed) < 0.3 ? '-rotate-90' : '';
          // Only animate a subset of elements to reduce JS overhead
          const shouldAnimate = isInView && Math.random() > 0.7;
          const animationDelay = pseudoRandom(seed + 200) * 2;

          return (
            <div key={word} className="flex items-center justify-center min-h-[60px]">
              <span
                className={`cursor-pointer p-2 font-semibold ${size} ${rotate} text-dark select-none block ${
                  shouldAnimate ? 'animate-float' : ''
                }`}
                style={
                  shouldAnimate
                    ? {
                        animationDelay: `${animationDelay}s`,
                        willChange: 'transform',
                      }
                    : undefined
                }
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-28 z-10 bg-gradient-to-t from-white via-50% to-transparent" />
    </div>
  );
}
