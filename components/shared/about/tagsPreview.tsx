import React from 'react';

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

export default function TagsPreview() {
  return (
    <div className=" relative  flex justify-center p-6">
      <div
        className="grid gap-1 max-w-sm lg:max-w-md relative"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
      >
        {words.map((word, i) => {
          const size = ['text-xs', 'text-sm', 'text-base', 'text-lg'][i % 4];
          const rotate = Math.random() < 0.3 ? '-rotate-90' : '';

          return (
            <div key={word} className="flex items-center justify-center min-h-[60px]">
              <span
                className={`cursor-pointer transition-all p-2  font-semibold ${size} ${rotate} text-black select-none block`}
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
