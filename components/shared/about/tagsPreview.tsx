'use client'
import React from 'react';
import { motion } from 'framer-motion';

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

const animations = [
  {
    x: [0, 3, -3, 0],
    //rotate: [rotate ? -5 : -1, rotate ? 0 : 1, rotate ? -5 : -1],
  },
  {
    y: [0, 4, -3, 0],
  },
];

// Deterministic pseudo-random generator so SSR and client render match
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function TagsPreview() {
  return (
    <div className=" relative  flex justify-center p-6">
      <div
        className="grid gap-1 max-w-sm lg:max-w-md relative"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
      >
        {words.map((word, i) => {
          const size = ['text-xs', 'text-sm', 'text-base', 'text-lg'][i % 4];
          const seed = i + 1;
          const rotate = pseudoRandom(seed) < 0.3 ? '-rotate-90' : '';
          const animationInd = pseudoRandom(seed + 100) < 0.5 ? 1 : 0;
          const duration = pseudoRandom(seed + 200) < 0.5 ? 3 : 4;

          return (
            <div key={word} className="flex items-center justify-center min-h-[60px]">
              <motion.span
                animate={{
                  ...animations[animationInd],

                  rotate: [rotate ? -5 : -1, rotate ? 0 : 1, rotate ? -5 : -1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`cursor-pointer transition-all p-2 font-semibold ${size} ${rotate} text-black select-none block`}
              >
                {word}
              </motion.span>
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-28 z-10 bg-gradient-to-t from-white via-50% to-transparent" />
    </div>
  );
}
