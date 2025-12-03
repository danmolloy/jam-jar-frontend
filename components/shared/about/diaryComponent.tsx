'use client';
import { DateTime } from 'luxon';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';

const text0 = `Today's practice focused on letting go of perfection and just performing. `;
const text1 = `I concentrated on breathing deeply before each run through, visualising the audition space and playing through everything without stopping. `;
const text2 = ` (regardless of mistakes). It was effective practice for the audition, and this is something I'm going to practice every day this week.`;
export default function DiaryComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const typewriterRef = useRef<TypewriterClass | null>(null);

  useEffect(() => {
    if (isInView && typewriterRef.current) {
      typewriterRef.current
        .typeString(text0)
        .pauseFor(3000)
        .typeString(text1)
        .pauseFor(3000)
        .deleteChars(2)
        .typeString(text2)
        .start();
    }
  }, [isInView]);

  return (
    <div className="bg-white text-xs p-4 m-4 w-54  rounded shadow flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm underline">New Entry</p>
        <p className="">{DateTime.now().toFormat('dd LLL')}</p>
      </div>
      <div ref={ref} className="text-xs  h-60 py-1">
        <Typewriter
          onInit={(instance) => {
            typewriterRef.current = instance;
          }}
          options={{
            cursor: '|',
            delay: 50,
          }}
        />
        {/* <p className={`whitespace-pre-wrap leading-relaxed ${isInView ? 'fade-in-text' : 'opacity-0'}`}>
          {text}
        </p> */}
      </div>
      <div className="text-blue-600 text-sm border border-blue-600 hover:underline bg-white w-10 rounded text-center self-end cursor-pointer">
        Save
      </div>
    </div>
  );
}
