'use client'
import { PracticeItem } from '@/components/practice/detailView';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';

const practice: PracticeItem[] = [
  {
    date: DateTime.now().toISO(),
    id: 1,
    activity: 'Scales',
    notes:
      'C, G and Bb Major. \nExploring different contact points on the string and not focusing on intonation for once.',
    tags: ['legatoAF'],
    duration: 15,
  },
  {
    date: DateTime.now().toISO(),
    id: 2,
    activity: 'Excerpts',
    notes: 'Heldenleben, Beethoven 9 & Mozart 40. \nListen back to recording for notes.',
    tags: ['auditionPrep'],
    duration: 45,
  },
  {
    date: DateTime.now().toISO(),
    id: 3,
    activity: 'Concerto',
    notes: 'Haydn & Sibelius. \nTry booking a larger room for tomorrow and get an audience.',
    tags: ['projection', 'intonation'],
    duration: 45,
  },
];

export default function LogPreview() {
  const date = DateTime.now();

  return (
    <div className="relative bg-white border shadow border-gray-400 rounded   mx-8  min-w-[80vw] lg:min-w-[40vw] ">
      <div className="">
        <h2 className="font-base text-base p-2">{date.toFormat('cccc dd LLL').toUpperCase()}</h2>
        <div className="">
          {practice.map((i, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: index * 0.5 + 0.5,
                duration: 0.05,
              }}
              key={i.id}
              className={` w-full flex flex-col justify-between items-start px-4 pb-2 `}
            >
              <div className="flex flex-row justify-between items-center w-full">
                <p>
                  {i.activity} ({i.duration} mins)
                </p>
              </div>
              <p className="text-sm self-start py-1  whitespace-pre-wrap">{i.notes}</p>
              <div
                
                className="text-xs flex flex-row gap-1 text-blue-500"
              >
                {i.tags?.map((i, ind) => (
                  <motion.p transition={{
                  delay: index * 0.4 + 2 + ind,
                  duration: 0.05,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }} key={ind} className="hover:underline cursor-pointer">
                    #{i}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
